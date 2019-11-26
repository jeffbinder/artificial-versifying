var hexameter_tables_orig = {1 : "isatthtppmosuroueeprprirrsridebsrpsfairitiiii dadidamdba aaa aab b   b  ",
                             2 : "dffbivvddiaaeuoeoacctlrtrnmttalaabanaa a  a a  b bi b  ",
                             3 : "mtivmvrasiiniaielchbqrldoiiiiuoierio  a ss s brmb  b  rb  ",
                             4 : "ppmppccpcrrooraoroæonrounondcstmscdfiutaiaeuicrrbtbdcruaautuuumnnbnunnnattutntttn  n t   tbbtr brb bb  ",
                             5 : "sspfctdipioiœreouodmgdimgrcennempmguriorioailaaranrtaa  a aaa  br b   ",
                             6 : "mqctpspssuuealoreælærnalamptdttnavpeaaaue ae  m m b rrb b dbr "}

var hexameter_tables_revised = {1 : "tiphambleugeosaaufrnsrprrrfbesretbieiaiiriadrd mdaaraaaeaa  a   e  ee ",
				2 : "fsdbvscstaiaeiiacetgmlnssolannlcttra aaairrt e   aaaaeeeee    ",
				3 : "sfptdpppfeoauoauaeqrtimttlruiisieoauis   t mn  sst t tsttssttt ",
				4 : "pppppmcpprrroroarræooronuæomrmtdssnmoiieutaaunttncrbrlsatduaurgtnuunbnaartnntntnna tt n ttnt  sts  tssts sts ",
				5 : "tppvlfacseoreuægrimcærmdmidpulbieimeolienrnerraaraaanaa  a   a  ee eee ",
				6 : "dsqapmdnsuæueruiiærpæealrgvaedrvtara  abaa a eema  e eee  "};

var pentameter_tables = {1 : "tapisittneremomruotdrprpirxrufrdispiiaioiatiac dbd ia aeaaaea e e   e ",
			 2 : "ppcppccsprroreooiræænærnngosscdfsgnctcliiuliuaruccmofrbiduimmiaubunuaecnnuntnnrattnt ttan  t s  ntss ssstt ststtss ",
			 3 : "iavvdflaaucieiaarsrtnrecbmtaaabttrar   aaaa aeee    e ",
			 4 : "dppncsmsmoureruoialdofuplnloetaeeeiisnennrssgadrdtbttn avaaaarae a    a ee eeee ",
			 5 : "natvsmmvmoliiceaiivibrirldhaiiioaiei s s  ss e e ee  "};

var english_tables = {1 : "wshdshfvfioaiaooeacrrsdrurikdso rlyteihr i _hdd d d bl   e   ae   r   ds   e    s   d              ",
		      2 : "wdfwvvwgloeaaoooioretrwwrfsddesssdtssss   sse        s         ",
		      3 : "ffIffyIfIoo_ooo_o_rrsrrutrk__a___h_nmyyatsiooeo _hentw u meekh    a_  e    ne  r     v  s     i        l             ",
		      4 : "ftwwpwypcoaiiriirorklloleoneellmlldft___i_duiecsbsc crlahrea emlroi u    ewn s    _ g e    o        f                ",
		      5 : "sdpcotdqctrlofiouuaeemfmcapradpeetrssmgansrr  secs ie   ste nl    ss es       s           ",
		      6 : "mccocaeaoaeenllvlfnrrleoiwtyttyanlae aa re yn ii l  s  nn y             "};

var version = "original";
var pentameter = false;
var jump_time = 200;
var write_time = 1000;

function generate_table_html(tables, n, wide)
{
    var table = tables[n];
    var html = [];
    if (wide) {
	html.push("<div class='table table11'>");
    } else {
	html.push("<div class='table table10'>");
    }
    html.push("<div class='subheader'>" + n + "</div>");
    for (var i in table) {
	var letter = table[i];
	if (letter == " ") {
	    html.push("<div class='tablecell blankcell'></div>");
	} else if (letter == "_") {
	    html.push("<div class='tablecell'> </div>");
	} else {
	    html.push("<div class='tablecell'>" + letter + "</div>");
	}
    }
    html.push("</div>");
    return html.join("");
}

function display_tables()
{
    var html = [];
    if (version == "revised") {
	if (pentameter) {
	    html.push("<div class='header'>The Versifying Tables for Pentameter</div>");
	    for (var i = 1; i <= 5; i++) {
		html.push(generate_table_html(pentameter_tables, i, false));
	    }
	} else {
	    html.push("<div class='header'>The Versifying Tables for Hexameter</div>");
	    for (var i = 1; i <= 6; i++) {
		html.push(generate_table_html(hexameter_tables_revised, i, false));
	    }
	}
    } else if (version == "English") {
	html.push("<div class='header'>The Versifying Tables</div>");
	for (var i = 1; i <= 6; i++) {
	    html.push(generate_table_html(english_tables, i, false));
	}
    } else {
	html.push("<div class='header'>The Versifying Tables</div>");
	for (var i = 1; i <= 6; i++) {
	    html.push(generate_table_html(hexameter_tables_orig, i,
					  i != 5));
	}
    }
    html = html.join("");
    $("#table-area").html(html);
}

function change_version()
{
    cancel_generation();
    version = $("#select-version").val();
    if (version == "revised") {
	$("#select-type").prop("disabled", "")
	    .val("hexameter");
    } else {
	$("#select-type").prop("disabled", "true")
	    .val("hexameter");
	pentameter = false;
    }
    $("#input").val("123456");
    display_tables();
}

function change_type()
{
    cancel_generation();
    var type = $("#select-type").val();
    pentameter = type == "pentameter";
    if (pentameter) {
	$("#input").val("12345");
    } else {
	$("#input").val("123456");
    }
    display_tables();
}

function change_speed()
{
    var fast = $("#select-speed").prop("checked");
    if (fast) {
	jump_time = 20;
	write_time = 100;
    } else {
	jump_time = 200;
	write_time = 1000;
    }
}

function demystify(tables)
{
    var word_lists = {};
    for (var n in tables) {
	var table = tables[n];
	var table_length = table.length;
	var word_list = [];
	for (var digit = 1; digit < 10; digit++) {
	    var word = "";
	    for (var i = digit - 1; i < table_length; i += 9) {
		var letter = table[i];
		if (letter == " ") {
		    break;
		}
		word += letter;
	    }
	    word_list.push(word);
	}
	word_lists[n] = word_list;
    }
    return word_lists;
}

function validate_input(digits)
{
    if (pentameter) {
	if (digits.length != 5) {
	    return false;
	}
    } else {
	if (digits.length != 6) {
	    return false;
	}
    }
    return /^[1-9]+$/.test(digits);
}

function generate_verse(tables, digits)
{
    var word_list = [];
    for (var i in digits) {
	var digit = digits[i];
	var table = tables[parseInt(i)+1];
	var table_length = table.length;
	var word = "";
	for (var j = digit - 1; j < table_length; j += 9) {
	    var letter = table[j];
	    if (letter == " ") {
		break;
	    }
	    word += letter;
	}
	word_list.push(word);
    }
    return word_list.join(" ");
}

var timer;
function generate_step(tables, digits, i, j, k)
{
    i = parseInt(i);
    j = parseInt(j);
    k = parseInt(k);
    var table_idx = i;
    if (i >= digits.length) {
	return;
    }
    var digit = parseInt(digits[i]);
    var table = tables[i+1];
    var table_length = table.length;

    if (k == 0) {
	k = digit + 1;
    }
    if (k < 9) {
	var table_el = $($("#table-area").children(".table")[table_idx]);
	var cell_el = $(table_el.children(".tablecell")[j]);
	var old_color = cell_el.css("background-color");
	cell_el.css("background-color", "blue");
	window.setTimeout(function() {
	    cell_el.css("background-color", old_color);
	}, jump_time);
	timer = window.setTimeout(function() {
	    generate_step(tables, digits, i, j + 1, k + 1);
	}, jump_time);
	return;
    }
    if (j >= table_length) {
	generate_step(tables, digits, i + 1, 0, 0);
	return;
    }
    var letter = table[j];
    var table_el = $($("#table-area").children(".table")[table_idx]);
    var cell_el = $(table_el.children(".tablecell")[j]);
    var old_color = cell_el.css("background-color");
    cell_el.css("background-color", "red");
    if (letter == "_") {
	$("#output-area").append(" ");
    } else {
	$("#output-area").append(letter);
    }
    window.setTimeout(function() {
	cell_el.css("background-color", old_color);
    }, write_time);
    timer = window.setTimeout(function() {
	if (letter == " ") {
	    generate_step(tables, digits, i + 1, 0, 0);
	} else {
	    generate_step(tables, digits, i, j + 1, 1);
	}
    }, write_time);
}

function cancel_generation()
{
    if (timer) {
	clearTimeout(timer);
    }
}

function generate()
{
    cancel_generation();
    var tables;
    if (version == "revised") {
	if (pentameter) {
	    tables = pentameter_tables;
	} else {
	    tables = hexameter_tables_revised;
	}
    } else if (version == "English") {
	tables = english_tables;
    } else {
	tables = hexameter_tables_orig;
    }
    var digits = $("#input").val();
    if (validate_input(digits)) {
	$("#output-area").html("");
	generate_step(tables, digits, 0, 0, 0);
    } else {
	$("#output-area").html("Invalid input!");
    }
}

$(function () {
    display_tables();
});
