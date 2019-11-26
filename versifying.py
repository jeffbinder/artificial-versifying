hexameter_tables_orig = {1 : "isatthtppmosuroueeprprirrsridebsrpsfairitiiii dadidamdba aaa aab b   b  ",
                         2 : "dffbivvddiaaeuoeoacctlrtrnmttalaabanaa a  a a  b bi b  ",
                         3 : "mtivmvrasiiniaielchbqrldoiiiiuoierio  a ss s brmb  b  rb  ",
                         4 : "ppmppccpcrrooraoroæonrounondcstmscdfiutaiaeuicrrbtbdcruaautuuumnnbnunnnattutntttn  n t   tbbtr brb bb  ",
                         5 : "sspfctdipioiœreouodmgdimgrcennempmguriorioailaaranrtaa  a aaa  br b   ",
                         6 : "mqctpspssuuealoreælærnalamptdttnavpeaaaue ae  m m b rrb b dbr "}

hexameter_tables_revised = {1 : "tiphambleugeosaaufrnsrprrrfbesretbieiaiiriadrd mdaaraaaeaa  a   e  ee ",
		            2 : "fsdbvscstaiaeiiacetgmlnssolannlcttra aaairrt e   aaaaeeeee    ",
		            3 : "sfptdpppfeoauoauaeqrtimttlruiisieoauis   t mn  sst t tsttssttt ",
		            4 : "pppppmcpprrroroarræooronuæomrmtdssnmoiieutaaunttncrbrlsatduaurgtnuunbnaartnntntnna tt n ttnt  sts  tssts sts ",
		            5 : "tppvlfacseoreuægrimcærmdmidpulbieimeolienrnerraaraaanaa  a   a  ee eee ",
		            6 : "dsqapmdnsuæueruiiærpæealrgvaedrvtara  abaa a eema  e eee  "};

pentameter_tables = {1 : "tapisittneremomruotdrprpirxrufrdispiiaioiatiac dbd ia aeaaaea e e   e ",
		     2 : "ppcppccsprroreooiræænærnngosscdfsgnctcliiuliuaruccmofrbiduimmiaubunuaecnnuntnnrattnt ttan  t s  ntss ssstt ststtss ",
		     3 : "iavvdflaaucieiaarsrtnrecbmtaaabttrar   aaaa aeee    e ",
		     4 : "dppncsmsmoureruoialdofuplnloetaeeeiisnennrssgadrdtbttn avaaaarae a    a ee eeee ",
		     5 : "natvsmmvmoliiceaiivibrirldhaiiioaiei s s  ss e e ee  "}


def versify(digits, tables):
    word_list = []
    for i, digit in enumerate(digits):
        table = tables[i+1]
        word = ""
        start_digit = 8 - int(digit)
        if start_digit < 0:
            start_digit += 9
        for j in range(start_digit, len(table), 9):
            letter = table[j]
            if letter == " ":
                break
       	    word += letter;
        word_list.append(word)
    return ' '.join(word_list)

def create_table(words):
    max_len = 0
    for word in words:
        if len(word) > max_len:
            max_len = len(word)
    s = ""
    for i in range(max_len + 1):
        for word in words:
            try:
                s += word[i]
            except IndexError:
                s += " "
    return s

print('"' + create_table(["wicked", "sordid", "harsh", "disordered", "sad", "horrid", "foul", "very_bad", "faithless"]) + '"')
print('"' + create_table(["words", "deeds", "fates", "wars", "vows", "vows", "words", "gifts", "losses"]) + '"')
print('"' + create_table(["for_me", "for_you", "I_say", "for_a_man", "for_the_evil", "you_see", "I_think", "for_others", "I_know"]) + '"')
print('"' + create_table(["foretell", "take_care_of", "will_show", "will_bring", "promise", "will_cause", "yield", "produce", "confirm"]) + '"')
print('"' + create_table(["stars", "dreams", "pledges", "compacts", "offenses", "times", "doctrines", "quarrels", "cups"]) + '"')
print('"' + create_table(["many", "certain", "certain", "only", "clearly", "alone", "evil", "always", "often"]) + '"')

print(versify('123456', hexameter_tables_orig))
print(versify('234561', hexameter_tables_orig))
print(versify('345612', hexameter_tables_orig))
print(versify('456123', hexameter_tables_orig))
print(versify('561234', hexameter_tables_orig))
print(versify('612345', hexameter_tables_orig))
print(versify('912345', hexameter_tables_orig))

