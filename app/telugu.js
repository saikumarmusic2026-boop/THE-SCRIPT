/* Telugu typing for THE SCRIPT.
   Type Telugu in English letters (Tenglish) and the word turns into Telugu script when you press
   space, a punctuation mark, Enter or Tab. Example:
     namaskaram naa peru tharun nenu chadavadam maanesaanu
     -> నమస్కారం నా పేరు తరుణ్ నేను చదవడం మానేసాను

   How the spelling stays right:
   1. A built-in dictionary of common Telugu words (and names) is searched with a "loose key", so
      naa / na, peru / pEru, chadavadam / chadavadam all find the correctly spelled word.
   2. A word with an ending (ravitho, ammaki, pustakaalu) is built from the dictionary word plus the ending.
   3. Anything else is written by sound. Right after a word turns Telugu, Ctrl+Space swaps it for the next
      spelling in place (no box), and the app remembers the spelling you settle on.
   4. Put a ` in front of a word to keep it in English.                                          */
(function (root) {
  'use strict';

  // ---------------------------------------------------------------- dictionary
  // Earlier words win when two words sound the same, so common words come first.
  const WORDS = `
    నేను నువ్వు నీవు మీరు మేము మనం మనము అతను అతడు ఆమె వాడు వీడు వాళ్ళు వాళ్లు వారు వీరు వీళ్ళు వీళ్లు అది ఇది అవి ఇవి ఏది ఏవి
    నాకు నీకు మీకు మాకు మనకు అతనికి ఆమెకు వాడికి వాళ్ళకు వారికి నన్ను నిన్ను మిమ్మల్ని మమ్మల్ని మనల్ని అతన్ని ఆమెను వాడిని వాళ్ళను వారిని
    నాతో నీతో మీతో మాతో అతనితో ఆమెతో వాడితో వాళ్ళతో నాది నీది మీది మనది నావి నీవి మావి నా నీ మీ మా మన అతని వాడి వాళ్ళ వారి వీరి
    ఎవరు ఎవరిని ఎవరికి ఎవరి ఎవరితో ఎవరూ ఏమి ఏం ఏంటి ఏమిటి ఏమీ ఏమైంది ఏమో ఎందుకు ఎక్కడ ఎప్పుడు ఎలా ఎంత ఎన్ని ఎంతమంది ఏ ఈ ఆ ఏదైనా ఎవరైనా ఎక్కడైనా ఎప్పుడైనా ఏమైనా ఏదీ
    ఇక్కడ అక్కడ ఇప్పుడు అప్పుడు ఇలా అలా అలాగే ఇలాగే ఇంకా ఇంకొక ఇంకొకటి మళ్ళీ మళ్లీ ఇక అయితే కానీ కాని మరి మరియు లేదా ఎందుకంటే అందుకే అంటే అని అనే అన్న
    అంతా అంత ఇంత అందరూ అందరికీ అన్నీ అన్ని కొంచెం కొంత చాలా చాలు కొన్ని కొందరు కొంతమంది అస్సలు అసలు నిజంగా నిజం అబద్ధం తప్పు ఒప్పు సరే సరి అవును కాదు లేదు కూడా మాత్రమే మాత్రం కేవలం
    ఖచ్చితంగా తప్పకుండా బహుశా ఒకవేళ చివరికి మొదట తర్వాత ముందు అంతే ఇంతే ఇంతలో అంతలో అయినా ఐనా అయినప్పటికీ కదా కదండి అవునా అయ్యో అబ్బా అరే ఒరేయ్ ఏరా ఏమండీ అండి గారు అన్నా అక్కా రా రండి పదండి పద
    ఉంది ఉన్నాను ఉన్నావు ఉన్నారు ఉన్నాడు ఉన్నాం ఉన్నాయి ఉండు ఉండండి ఉంటాను ఉంటాడు ఉంటారు ఉండదు ఉండేది ఉండాలి ఉండలేను లేను లేరు లేవు లేడు ఉండడం
    నమస్కారం నమస్తే ధన్యవాదాలు క్షమించండి దయచేసి స్వాగతం శుభోదయం శుభరాత్రి శుభాకాంక్షలు అభినందనలు బాగున్నారా బాగున్నావా బాగున్నాను బాగుంది బాగా బాగుండు
    పేరు పేర్లు నా పేరు తెలుగు తెలంగాణ ఆంధ్రప్రదేశ్ ఆంధ్ర హైదరాబాద్ కాలేజీ రవీంద్ర
    అమ్మ నాన్న అమ్మా నాన్నా అన్న అన్నయ్య తమ్ముడు అక్క అక్కయ్య చెల్లి చెల్లెలు తాత అమ్మమ్మ నానమ్మ తాతయ్య అత్త మామ మామయ్య బాబాయ్ పిన్ని పెదనాన్న పెద్దమ్మ భార్య భర్త కొడుకు కూతురు బిడ్డ పిల్లలు పిల్లవాడు పాప బాబు అబ్బాయి అమ్మాయి
    స్నేహితుడు స్నేహితురాలు స్నేహితులు మనిషి మనుషులు ప్రజలు జనం గురువు టీచర్ విద్యార్థి విద్యార్థులు డాక్టర్ పోలీస్ దొంగ రాజు రాణి దేవుడు దేవత
    ఇల్లు ఇంట్లో ఇంటికి ఇంటి గది రోడ్డు వీధి ఊరు ఊళ్ళో గ్రామం పట్టణం నగరం దేశం ప్రపంచం కాలేజ్ స్కూల్ ఆఫీస్ ఆసుపత్రి ఆస్పత్రి హాస్పిటల్ దుకాణం షాపు హోటల్ గుడి బజారు స్టేషన్ బస్సు రైలు కారు బైక్ పొలం తోట నది సముద్రం కొండ అడవి ఆకాశం భూమి
    రోజు ఈరోజు రేపు నిన్న ఎల్లుండి నేడు రాత్రి పగలు ఉదయం సాయంత్రం మధ్యాహ్నం ఇవాళ వారం నెల సంవత్సరం గంట నిమిషం క్షణం సమయం కాలం ఎప్పటికీ ఎప్పుడూ ఎల్లప్పుడూ
    సినిమా కథ కథానాయకుడు నాయిక దర్శకుడు నిర్మాత రచయిత స్క్రిప్ట్ సన్నివేశం దృశ్యం సంభాషణ సంభాషణలు పాట పాటలు హీరో హీరోయిన్ విలన్ ఫైట్ క్లైమాక్స్ ఇంటర్వెల్
    మాట మాటలు పని పనులు డబ్బు బంగారం ప్రేమ కోపం భయం ఆనందం సంతోషం బాధ దుఃఖం నవ్వు కన్నీరు కళ్ళు కళ్లు కన్ను చేయి చేతులు కాలు తల ముఖం మనసు మనస్సు గుండె జీవితం ప్రాణం చావు పుట్టుక
    చదువు పరీక్ష ఉద్యోగం ఉద్యోగి వ్యాపారం ఆట ఆటలు పుస్తకం పుస్తకాలు ఫోన్ ఫోటో వార్త వార్తలు అబద్ధాలు నిజాలు కల కలలు ఆశ నమ్మకం ధైర్యం శక్తి బలం సహాయం సాయం న్యాయం అన్యాయం కష్టం సుఖం
    విజయం ఓటమి గెలుపు తప్పులు సమస్య సమస్యలు పరిష్కారం ప్రశ్న ప్రశ్నలు జవాబు సమాధానం కారణం ఫలితం అవకాశం భవిష్యత్తు గతం వర్తమానం నీళ్ళు నీళ్లు నీరు అన్నం భోజనం టీ కాఫీ పాలు పండు కూరగాయలు ఆహారం ఆకలి దాహం నిద్ర
    మంచి చెడు పెద్ద చిన్న కొత్త పాత మంచిది చెడ్డ మంచోడు మంచిగా అందమైన అందం సులభం తెలివైన తెలివి తొందరగా నెమ్మదిగా ఎక్కువ తక్కువ ముఖ్యం ముఖ్యమైన అవసరం ఖాళీ నిండా పూర్తి మొదటి రెండవ మూడవ చివరి
    ఒకటి రెండు మూడు నాలుగు ఐదు ఆరు ఏడు ఎనిమిది తొమ్మిది పది ఇరవై ముప్పై నలభై యాభై అరవై డెబ్బై ఎనభై తొంభై వంద వెయ్యి లక్ష ఒక ఒకరు ఇద్దరు ముగ్గురు నలుగురు
    దగ్గర దగ్గరకు దూరం దూరంగా పక్కన పైన కింద లోపల బయట వెనక వెనుక మధ్య చుట్టూ ఎదురుగా పక్క ఎడమ కుడి
    లో కి కు తో గా కోసం వల్ల నుంచి నుండి వరకు గురించి మీద పైన
    చేయడం చెయ్యడం చేయి చెయ్యి చేయండి చెయ్యండి చేశాను చేసాను చేశావు చేసావు చేశాడు చేసాడు చేసింది చేశారు చేసారు చేసి చేస్తే చేస్తున్నాను చేస్తున్నావు చేస్తున్నాడు చేస్తున్నది చేస్తున్నారు చేస్తాను చేస్తావు చేస్తాడు చేస్తారు చేస్తాం చేయాలి చెయ్యాలి చేయను చేయలేను చేయలేదు చేయకు చేయొద్దు చేసే చేయగలను చేయగలవు చేయగలడు చేయగలరు
    చూడడం చూడు చూడండి చూశాను చూసాను చూశావు చూశాడు చూసాడు చూసింది చూశారు చూసి చూస్తే చూస్తున్నాను చూస్తున్నాడు చూస్తున్నారు చూస్తాను చూస్తావు చూస్తారు చూడాలి చూడలేదు చూడను చూడలేను చూసేవాడు
    వెళ్ళడం వెళ్లడం వెళ్ళు వెళ్లు వెళ్ళండి వెళ్లండి వెళ్ళాను వెళ్లాను వెళ్ళావు వెళ్ళాడు వెళ్లాడు వెళ్ళింది వెళ్లింది వెళ్ళారు వెళ్లారు వెళ్ళి వెళ్లి వెళ్తే వెళ్తున్నాను వెళ్తున్నాడు వెళ్తున్నారు వెళ్తాను వెళ్తావు వెళ్తారు వెళ్ళాలి వెళ్లాలి వెళ్ళను వెళ్ళలేదు
    రావడం రండి వచ్చాను వచ్చావు వచ్చాడు వచ్చింది వచ్చారు వచ్చి వస్తే వస్తున్నాను వస్తున్నాడు వస్తున్నారు వస్తాను వస్తావు వస్తారు రావాలి రాను రాలేదు రాలేను రాకు రాదు
    ఇవ్వడం ఇవ్వు ఇవ్వండి ఇచ్చాను ఇచ్చావు ఇచ్చాడు ఇచ్చింది ఇచ్చారు ఇచ్చి ఇస్తే ఇస్తున్నాను ఇస్తాను ఇస్తావు ఇస్తారు ఇవ్వాలి ఇవ్వను ఇవ్వలేదు
    తీసుకోవడం తీసుకో తీసుకోండి తీసుకున్నాను తీసుకున్నాడు తీసుకుంది తీసుకున్నారు తీసుకుని తీసుకొని తీసుకుంటే తీసుకుంటున్నాను తీసుకుంటాను తీసుకుంటారు తీసుకోవాలి తీసుకోను
    చెప్పడం చెప్పు చెప్పండి చెప్పాను చెప్పావు చెప్పాడు చెప్పింది చెప్పారు చెప్పి చెబితే చెబుతున్నాను చెప్తున్నాను చెబుతాను చెప్తాను చెప్తావు చెప్పాలి చెప్పను చెప్పలేదు చెప్పలేను
    అడగడం అడుగు అడగండి అడిగాను అడిగావు అడిగాడు అడిగింది అడిగారు అడిగి అడిగితే అడుగుతున్నాను అడుగుతాను అడగాలి అడగను
    తినడం తిను తినండి తిన్నాను తిన్నావు తిన్నాడు తిన్నది తిన్నారు తిని తింటే తింటున్నాను తింటున్నాడు తింటాను తింటావు తినాలి తినను తినలేదు
    తాగడం తాగు తాగండి తాగాను తాగాడు తాగుతున్నాను తాగుతాను తాగాలి తాగను
    పడుకోవడం పడుకో పడుకున్నాను పడుకున్నాడు పడుకుంటాను పడుకోవాలి
    చదవడం చదువు చదవండి చదివాను చదివావు చదివాడు చదివింది చదివారు చదివి చదివితే చదువుతున్నాను చదువుతున్నాడు చదువుతాను చదవాలి చదవను చదవలేదు చదువుకో చదువుకున్నాను
    రాయడం రాయి రాయండి రాశాను రాసాను రాశావు రాశాడు రాసాడు రాసింది రాసి రాస్తే రాస్తున్నాను రాస్తాను రాయాలి రాయను రాయలేదు
    మానేయడం మానేయి మానెయ్యి మానేయండి మానేశాను మానేసాను మానేశావు మానేశాడు మానేసాడు మానేసింది మానేశారు మానేసి మానేస్తే మానేస్తున్నాను మానేస్తాను మానేయాలి మానేయను
    అవ్వడం అవ్వు అయ్యాను అయ్యావు అయ్యాడు అయ్యింది అయింది అయ్యారు అయి అవుతున్నాను అవుతుంది అవుతోంది అవుతాను అవుతారు అవ్వాలి కావాలి కావాలా కావాలని కావాలనుకుంటున్నాను కాను కాలేదు అయిపోయింది అయిపోయాను
    పోవడం పో పోండి పోయాను పోయావు పోయాడు పోయింది పోయారు పోయి పోతే పోతున్నాను పోతాను పోవాలి పోను పోలేదు పోతుంది
    తెలుసు తెలుసా తెలియదు తెలియడం తెలిసింది తెలిసి తెలుసుకున్నాను తెలుసుకుంటాను తెలుసుకోవాలి తెలీదు
    అనడం అను అనండి అన్నాను అన్నావు అన్నాడు అన్నది అన్నారు అంటే అంటున్నాను అంటాను అంటావు అంటారు అనాలి అనను
    అర్థం అర్థమైంది అర్థమైందా అర్థమవుతుంది
    కలవడం కలుసుకో కలిశాను కలిసాను కలిశాడు కలిసి కలిస్తే కలుస్తాను కలవాలి కలుస్తున్నాను
    ఆడడం ఆడటం ఆడు ఆడండి ఆడాను ఆడాడు ఆడుతున్నాను ఆడుతాను ఆడాలి
    పాడడం పాడటం పాడు పాడాను పాడాడు పాడుతున్నాను పాడాలి
    నవ్వడం నవ్వండి నవ్వాను నవ్వాడు నవ్వింది నవ్వుతున్నాను నవ్వుతాను
    ఏడవడం ఏడ్వు ఏడ్చాను ఏడ్చాడు ఏడ్చింది ఏడుస్తున్నాను ఏడవకు ఏడ్వకు
    పరిగెత్తడం పరుగెత్తడం పరిగెత్తు పరిగెత్తాను పరుగెత్తాను పరిగెత్తాడు పరిగెత్తింది పరిగెడుతున్నాను పరుగెడుతున్నాను పరిగెడతాను పరిగెత్తాలి
    ఆగడం ఆగు ఆగండి ఆగాను ఆగాడు ఆగింది ఆగి ఆగితే ఆగుతున్నాను ఆగాలి ఆగను
    కూర్చోవడం కూర్చో కూర్చోండి కూర్చున్నాను కూర్చున్నాడు కూర్చుంది కూర్చుని కూర్చుంటాను
    నిలబడు నిలబడ్డాను నిలబడ్డాడు నిలబడి నిలబడతాను నిలబడాలి
    లేవడం లేచాను లేచాడు లేచింది లేచి లేస్తే లేస్తాను లేవాలి లేస్తున్నాను
    కొనడం కొను కొనండి కొన్నాను కొన్నాడు కొన్నది కొని కొంటే కొంటున్నాను కొంటాను కొనాలి కొనను
    అమ్మడం అమ్ము అమ్మండి అమ్మాను అమ్మాడు అమ్మింది అమ్మి అమ్మితే అమ్ముతున్నాను అమ్ముతాను అమ్మాలి
    పంపడం పంపు పంపండి పంపాను పంపాడు పంపింది పంపి పంపితే పంపుతాను పంపాలి
    పిలవడం పిలువు పిలవండి పిలిచాను పిలిచాడు పిలిచింది పిలిచి పిలిస్తే పిలుస్తున్నాను పిలుస్తాను పిలవాలి పిలవను
    వినడం విను వినండి విన్నాను విన్నాడు విన్నది విని వింటే వింటున్నాను వింటాను వినాలి వినను వినలేదు
    మాట్లాడడం మాట్లాడటం మాట్లాడు మాట్లాడండి మాట్లాడాను మాట్లాడాడు మాట్లాడింది మాట్లాడి మాట్లాడితే మాట్లాడుతున్నాను మాట్లాడుతాను మాట్లాడాలి మాట్లాడను
    ప్రేమించడం ప్రేమించు ప్రేమించాను ప్రేమించాడు ప్రేమించింది ప్రేమిస్తున్నాను ప్రేమిస్తాను ప్రేమిస్తే
    నమ్మడం నమ్ము నమ్మండి నమ్మాను నమ్మాడు నమ్మింది నమ్మి నమ్మితే నమ్ముతున్నాను నమ్ముతాను నమ్మను నమ్మలేదు
    ఆలోచించడం ఆలోచించు ఆలోచించండి ఆలోచించాను ఆలోచించాడు ఆలోచించి ఆలోచిస్తే ఆలోచిస్తున్నాను ఆలోచిస్తాను ఆలోచించాలి
    మర్చిపోవడం మర్చిపో మర్చిపోయాను మర్చిపోయాడు మర్చిపోయింది మర్చిపోయి మర్చిపోతే మర్చిపోతాను మర్చిపోను మర్చిపోవద్దు
    చావడం చచ్చాను చచ్చాడు చచ్చింది చస్తాను చస్తే చంపడం చంపాను చంపాడు చంపుతాను
    బతకడం బతుకు బతికాను బతికాడు బతికి బతికితే బతుకుతున్నాను బతుకుతాను బతకాలి బ్రతకడం బ్రతుకు
    నడవడం నడువు నడవండి నడిచాను నడిచాడు నడిచింది నడిచి నడుస్తున్నాను నడుస్తాను నడవాలి నడవను
    తెరవడం తెరువు తెరవండి తెరిచాను తెరిచాడు తెరిచి తెరిస్తే తెరుస్తాను తెరవాలి మూయడం మూయి మూయండి మూశాను మూసాను మూసాడు మూసి మూస్తాను మూయాలి
    పెట్టడం పెట్టు పెట్టండి పెట్టాను పెట్టాడు పెట్టింది పెట్టి పెడితే పెడుతున్నాను పెడతాను పెట్టాలి పెట్టను
    ఉంచడం ఉంచు ఉంచాను ఉంచి
    తీయడం తీయి తీశాను తీసాను తీశాడు తీసాడు తీసి తీస్తే తీస్తున్నాను తీస్తాను తీయాలి
    నేర్చుకోవడం నేర్చుకున్నాను నేర్చుకుంటాను నేర్చుకో నేర్పడం నేర్పు
    గెలవడం గెలిచాను గెలిచాడు గెలిచి గెలుస్తాను గెలవాలి ఓడిపోవడం ఓడిపోయాను ఓడిపోయాడు
    కష్టపడడం కష్టపడ్డాను కష్టపడతాను కష్టపడు కష్టపడి
    పెళ్ళి పెళ్లి పెళ్ళాం పెళ్ళయింది
    ఇష్టం ఇష్టమే ఇష్టపడ్డాను ఇష్టపడతాను ఇష్టపడ్డాడు
    వెళ్ళిపోవడం వెళ్ళిపో వెళ్ళిపోండి వెళ్ళిపోయాను వెళ్ళిపోయాడు వెళ్ళిపోయింది వెళ్ళిపోయారు వెళ్ళిపోతాను వెళ్లిపోయాను వెళ్లిపోయాడు వెళ్లిపోయింది వెళ్లిపోయారు వెళ్లిపో వెళ్లిపోతాను
    తరుణ్ రవి రామ్ రాము రాజు రాజేష్ రమేష్ సురేష్ మహేష్ గణేష్ నరేష్ దినేష్ శ్రీనివాస్ శ్రీకాంత్ శ్రీనాథ్ వెంకట్ వెంకటేష్ వెంకటేశ్వర్ కృష్ణ కిరణ్ కళ్యాణ్ అర్జున్ అనిల్ సునీల్ సందీప్ ప్రదీప్ ప్రవీణ్ ప్రసాద్ ప్రభాస్ చరణ్ చైతన్య సాయి హరీష్ హరి హర్ష విజయ్ విజయ వినయ్ వినోద్ వంశీ నాగార్జున చిరంజీవి బాలకృష్ణ అఖిల్ నిఖిల్ నాని ధనుష్ కార్తీక్ గోపి గోపాల్ గోవింద్ మధు మురళి మోహన్ ఆదిత్య అభిషేక్ అజయ్ అమర్ అక్షయ్ భరత్ బాలు దేవ్ దీపక్ ఈశ్వర్ జగన్ కమల్ లోకేష్ మనోజ్ నవీన్ నితిన్ పవన్ రాహుల్ రోహిత్ శివ శంకర్ సతీష్ సత్య సూర్య తేజ తేజా ఉదయ్ వరుణ్ యశ్వంత్
    సీత గీత రాధ లక్ష్మి సరస్వతి పార్వతి దుర్గ కావ్య అనిత సునీత సరిత లలిత కవిత శ్రావణి స్వాతి స్వప్న శ్రీ శ్రీదేవి శ్రీలత శ్రీవల్లి సమంత అనుష్క కాజల్ తమన్నా రష్మిక శ్రుతి పూజ ప్రియ ప్రియాంక ప్రణతి మాధవి మహిత మాలతి మంజుల మీనా మౌనిక నందిని నిత్య నిర్మల రమ్య రేఖ రోజా సంధ్య సౌమ్య సుజాత సుమ సుష్మ వాణి విజయలక్ష్మి యామిని దివ్య దీప్తి భవాని భారతి అమల అంజలి అపర్ణ అర్చన
  `;


  // More words: everyday talk, people, places, things, feelings, names, and more verb forms.
  const EXTRA = `
    అవునండి కాదండి సరేనండి చెప్పండి వెళ్ళండి పలకండి జరిగింది జరుగుతోంది జరుగుతుంది జరిగిపోయింది ఎందుకలా ఎలాగైనా ఎలాగో ఎవరో ఏదో ఎక్కడో ఎప్పుడో ఎందుకో అక్కడక్కడ అక్కడే ఇక్కడే ఇప్పుడే అప్పుడే ఎప్పుడైనా
    అయ్యో రామ రామా అమ్మో అబ్బో ఛీ ఛా ఓహో ఓహ్ అరెరె ఒసేయ్ తమ్ముడూ చెల్లీ బావా బావ మామా మరదలు వదిన బావగారు
    వాడే వీడే వాళ్ళే మనమే నేనే నువ్వే మీరే తానే తాను తనకు తనని తనతో స్వయంగా ఒంటరిగా కలిసే అందరం మేమంతా మనమంతా అందరితో అందరిలో ఎవరికైనా ఎవ్వరూ ఎవ్వరికీ ఎక్కడా ఎన్నడూ ఎప్పటికైనా ఏనాడూ
    నాన్నమ్మ తాతగారు అమ్మగారు అయ్యగారు అయ్య అమ్మాయిలు అబ్బాయిలు కొడుకులు కూతుళ్లు మనవడు మనవరాలు అల్లుడు కోడలు మరిది బావమరిది అత్తయ్య పెద్దన్న చిన్నన్న పెద్దక్క చిన్నాన్న పిన్నమ్మ
    జుట్టు కన్నులు చెవి ముక్కు నోరు పళ్ళు నాలుక మెడ భుజం చేతులు వేళ్ళు గోళ్ళు కడుపు వీపు కాళ్ళు పాదం శరీరం రక్తం చర్మం ఎముక
    పప్పు కూర పచ్చడి సాంబారు రసం పెరుగు మజ్జిగ నెయ్యి నూనె ఉప్పు కారం పంచదార చక్కెర బెల్లం రొట్టె చపాతీ ఇడ్లీ దోశ వడ పూరీ బిర్యానీ మామిడి పండ్లు అరటి యాపిల్ బంగాళదుంప ఉల్లిపాయ టమాటా మిరపకాయ వెల్లుల్లి అల్లం కొబ్బరి చేపలు మాంసం గుడ్డు చికెన్ మటన్ స్వీట్ లడ్డు
    గాలి నిప్పు చెట్టు చెట్లు పువ్వు పువ్వులు ఆకు ఆకులు చెరువు బావి వాన వర్షం ఎండ చలి వేడి మంచు మేఘం మేఘాలు చంద్రుడు సూర్యుడు నక్షత్రం నక్షత్రాలు తుఫాను పంట వరి గడ్డి రాయి ఇసుక మట్టి
    కుక్క పిల్లి ఆవు గేదె ఎద్దు గుర్రం ఏనుగు సింహం పులి కోతి పాము పక్షి కాకి చిలుక నెమలి చేప ఎలుక పంది మేక గొర్రె
    వంటగది తలుపు కిటికీ మంచం కుర్చీ బల్ల అద్దం గడియారం దీపం లైట్ ఫ్యాన్ టీవీ కంప్యూటర్ బండి సైకిల్ విమానం పడవ పెట్టె సంచి బ్యాగ్ కలం పెన్ను పేపర్ కాగితం లేఖ ఉత్తరం తాళం తాళంచెవి నోటు నాణెం బట్టలు చొక్కా చీర ప్యాంటు చెప్పులు బూట్లు గొడుగు కళ్ళజోడు ఉంగరం గొలుసు
    విజయవాడ విశాఖపట్నం తిరుపతి గుంటూరు వరంగల్ కర్నూలు నెల్లూరు రాజమండ్రి కాకినాడ ఖమ్మం కరీంనగర్ నిజామాబాద్ చెన్నై బెంగళూరు ముంబై ఢిల్లీ అమెరికా ఇండియా భారతదేశం దేవాలయం మసీదు చర్చి బడి పాఠశాల కళాశాల విశ్వవిద్యాలయం బ్యాంక్ మార్కెట్ రెస్టారెంట్ థియేటర్ పార్క్ సందు చౌరస్తా బస్టాండ్ రైల్వేస్టేషన్ ఎయిర్పోర్ట్
    నర్సు లాయర్ ఇంజినీర్ పోలీసు రైతు కూలీ డ్రైవర్ నటుడు నటి గాయకుడు కవి పూజారి వ్యాపారి మంత్రి ముఖ్యమంత్రి కలెక్టర్ జడ్జి సైనికుడు
    నిరాశ అనుమానం భయపడు కంగారు ఆందోళన సిగ్గు గర్వం అసూయ కృతజ్ఞత దయ కరుణ జాలి అయిష్టం ద్వేషం స్నేహం శత్రుత్వం బంధం బంధువులు కుటుంబం బాధ్యత స్వేచ్ఛ శాంతి యుద్ధం కలహం గొడవ
    మరణం జ్ఞాపకం జ్ఞాపకాలు యుగం సోమవారం మంగళవారం బుధవారం గురువారం శుక్రవారం శనివారం ఆదివారం జనవరి ఫిబ్రవరి మార్చి ఏప్రిల్ మే జూన్ జూలై ఆగస్టు సెప్టెంబర్ అక్టోబర్ నవంబర్ డిసెంబర్ ఉగాది సంక్రాంతి దీపావళి దసరా
    గొప్ప పొడవు పొట్టి లావు సన్నని బరువు తేలిక అసహ్యమైన మూర్ఖమైన ధనవంతుడు పేదవాడు బలమైన బలహీనమైన వేగంగా దగ్గరగా లోతైన ఎత్తైన నిండు శుభ్రమైన మురికి చల్లని తీపి చేదు పులుపు రుచి ప్రమాదం సురక్షితం నిజమైన అబద్ధమైన ఒంటరి
    హలో హాయ్ ఓకే థాంక్యూ సారీ ప్లీజ్ బై గుడ్ నైట్ స్టార్ట్ కట్ యాక్షన్ షాట్ సీన్ లొకేషన్ షూటింగ్ రికార్డ్ ఎడిట్ ఫైల్ ఫోల్డర్ మెసేజ్ కాల్ నంబర్ లైఫ్ లవ్ ఫ్రెండ్ ఫ్యామిలీ ఆఫీసర్ సర్ మేడమ్ బాస్ టైమ్ టైం ప్రాబ్లం చాన్స్ ప్లాన్ మనీ ఫుడ్ బిల్ టికెట్ ట్రైన్ బస్ ఫ్లైట్ కార్ రోడ్ సిగ్నల్ ట్రాఫిక్ పార్టీ ఫంక్షన్ గిఫ్ట్ వీడియో ఇంటర్నెట్ సోషల్ మీడియా
    చూసుకో చూసుకుంటాను చూసుకున్నాను చూసుకుంటే పట్టుకో పట్టుకున్నాను పట్టుకుంటాను
    దాచడం దాచు దాచాను దాచాడు దాచి వెతకడం వెతుకు వెతికాను వెతికాడు వెతికి వెతుకుతున్నాను
    దొరకడం దొరికింది దొరికాడు దొరికాను దొరుకుతుంది కనిపించింది కనిపించాడు కనిపిస్తుంది కనిపించలేదు కనపడింది వినిపించింది వినిపిస్తుంది అనిపించింది అనిపిస్తుంది అనిపించలేదు
    నచ్చింది నచ్చలేదు నచ్చుతుంది నచ్చాడు భయపడ్డాను భయపడ్డాడు భయపడకు భయపడతాను భయపడుతున్నాను కోప్పడ్డాడు కోప్పడకు
    ఎగిరింది ఎగురు ఎగిరాడు దూకాడు దూకు దూకాను దూకింది పడిపోయాను పడిపోయాడు పడిపోయింది పడిపోతాను పడ్డాను పడ్డాడు పడింది పడు పడతాను
    లేపు లేపాను లేపాడు కొట్టడం కొట్టు కొట్టాను కొట్టాడు కొట్టింది కొడతాను కొడుతున్నాను కొట్టకు తిట్టాడు తిట్టింది తిట్టకు తిడతాను
    మోయి మోశాను మోసాడు మోస్తున్నాను లాగు లాగాను లాగాడు తోశాను తోసాడు తోసింది తోయి
    వదలడం వదులు వదిలాను వదిలాడు వదిలింది వదిలేయి వదిలేశాను వదిలేసాను వదిలేస్తాను వదలను వదిలిపెట్టు ఇచ్చేశాను ఇచ్చేసాను ఇచ్చేయి ఇచ్చేస్తాను
    తెచ్చాను తెచ్చాడు తెచ్చింది తెస్తాను తీసుకొచ్చాను తీసుకొస్తాను తీసుకురా తెచ్చి తేవడం తే ఎత్తు ఎత్తాను ఎత్తాడు
    వేయి వేశాను వేసాను వేశాడు వేసాడు వేస్తాను వేసి వేయండి వేయకు కట్టు కట్టాను కట్టాడు కట్టి కడతాను కట్టింది కడుగు కడిగాను కడిగాడు కడిగి తుడుచు తుడిచాను తుడిచాడు తుడిచి ఉతికాను
    వండు వండాను వండాడు వండింది వండి వండుతాను వండుతున్నాను ఎదిగాడు ఎదిగింది ఎదుగు పెరిగాడు పెరిగింది పెరుగు పెరుగుతుంది పెంచడం పెంచాను పెంచాడు తగ్గింది తగ్గాడు తగ్గు తగ్గుతుంది తగ్గించు
    మారాడు మారింది మారుతుంది మార్చు మార్చాను మార్చాడు మారిపోయాడు ఒప్పుకున్నాను ఒప్పుకున్నాడు ఒప్పుకో ఒప్పుకుంటాను ఒప్పుకోను అంగీకరించాను అంగీకరించాడు కోరుకున్నాను కోరుకుంటున్నాను ఆశించాను
    ఆదుకో ఆదుకున్నాడు కాపాడు కాపాడాను కాపాడాడు కాపాడండి పోరాడు పోరాడాను పోరాడాడు ప్రయత్నించాను ప్రయత్నిస్తాను ప్రయత్నించు ప్రయత్నించాడు ఎదురుచూస్తున్నాను ఎదురుచూశాను ఉండిపో ఉండిపోయాను ఉండిపోయాడు
    రాజశేఖర్ నాగేశ్వరరావు వెంకటరావు సుబ్బారావు రామారావు కృష్ణారావు శ్రీరామ్ శ్రీధర్ శ్రీహర్ష ఆనంద్ అనంత్ అఖిలేష్ అరవింద్ అశోక్ బాబీ బాలాజీ చంద్ర చంద్రశేఖర్ చిన్నా దుర్గాప్రసాద్ గిరి హేమంత్ జయంత్ జాన్ కేశవ్ మల్లేష్ మనీష్ నాగ నాగరాజు నాగేష్ నందు పృథ్వీ రఘు రఘురామ్ రంగ రంగారావు రాఘవ రాజీవ్ రాకేష్ రమణ రవితేజ సాగర్ సత్యనారాయణ సంజయ్ శ్రీను సుధీర్ సుబ్బు సురేందర్ తిరుపతి ఉమేష్ వెంకన్న విశ్వ విష్ణు వీరబాబు
    అంజని అనూష ఆమని ఆరతి ఇందు ఉష ఉమ కల్పన కమల కనకదుర్గ కీర్తి కృష్ణవేణి కుసుమ లావణ్య లక్ష్మీ లత మహాలక్ష్మి మానస మమత మేఘన నాగమణి నవ్య నీరజ పద్మ పల్లవి ప్రభావతి ప్రశాంతి పుష్ప రజని రాజేశ్వరి రమాదేవి రాధిక రూప శారద శైలజ శాంతి శిరీష సంగీత సరోజ సౌజన్య శ్వేత సుప్రియ సుబ్బలక్ష్మి సునంద స్వర్ణ తనూజ తులసి వసంత వైష్ణవి వరలక్ష్మి విజయశాంతి యశోద
  `;

  // ---------------------------------------------------------------- Telugu -> loose key
  // The key keeps only the sound skeleton: long/short vowels, aspirated/plain, dental/retroflex all merge.
  const TV = { 'అ': 'a', 'ఆ': 'a', 'ఇ': 'i', 'ఈ': 'i', 'ఉ': 'u', 'ఊ': 'u', 'ఋ': 'ru', 'ౠ': 'ru', 'ఎ': 'e', 'ఏ': 'e', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'o', 'ఔ': 'au' };
  const TM = { 'ా': 'a', 'ి': 'i', 'ీ': 'i', 'ు': 'u', 'ూ': 'u', 'ృ': 'ru', 'ె': 'e', 'ే': 'e', 'ై': 'ai', 'ొ': 'o', 'ో': 'o', 'ౌ': 'au' };
  const TC = {
    'క': 'k', 'ఖ': 'k', 'గ': 'g', 'ఘ': 'g', 'ఙ': 'n', 'చ': 'c', 'ఛ': 'c', 'జ': 'j', 'ఝ': 'j', 'ఞ': 'n',
    'ట': 't', 'ఠ': 't', 'డ': 'd', 'ఢ': 'd', 'ణ': 'n', 'త': 't', 'థ': 't', 'ద': 'd', 'ధ': 'd', 'న': 'n',
    'ప': 'p', 'ఫ': 'p', 'బ': 'b', 'భ': 'b', 'మ': 'm', 'య': 'y', 'ర': 'r', 'ఱ': 'r', 'ల': 'l', 'ళ': 'l',
    'వ': 'v', 'శ': 'S', 'ష': 'S', 'స': 's', 'హ': 'h'
  };
  const VIRAMA = '్';

  function teKey(w) {
    const cs = Array.from(w);
    let out = '';
    for (let i = 0; i < cs.length; i++) {
      const c = cs[i];
      if (TC[c]) {
        const n = cs[i + 1];
        if (c === 'మ' && n === VIRAMA && i + 2 >= cs.length) { out += 'n'; i++; continue; } // final మ్ (Ram, Shyam)
        out += TC[c];
        if (n === VIRAMA) i++;
        else if (TM[n]) { out += TM[n]; i++; }
        else out += 'a';
      } else if (TV[c]) out += TV[c];
      else if (c === 'ం' || c === 'ఁ') out += 'n';
      else if (c === 'ః') out += 'h';
    }
    return out;
  }
  const loose = k => k.replace(/S/g, 's');                       // స and శ/ష sound alike to many writers
const squash = k => k.replace(/(.)\1+/g, '$1');

  // ---------------------------------------------------------------- English letters -> loose key
  function romKeys(word) {
    let s = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!s) return [];
    s = s.replace(/chh|ch/g, 'C').replace(/c/g, 'k').replace(/C/g, 'c')
      .replace(/sh/g, 'S').replace(/kh/g, 'k').replace(/gh/g, 'g').replace(/jh/g, 'j')
      .replace(/th/g, 't').replace(/dh/g, 'd').replace(/ph/g, 'p').replace(/bh/g, 'b')
      .replace(/x/g, 'ks').replace(/q/g, 'k').replace(/f/g, 'p').replace(/w/g, 'v').replace(/z/g, 'j');
    // "ee" can be ఈ or ఏ, "oo" can be ఊ or ఓ
    let vs = [s];
    for (let pass = 0; pass < 2; pass++) {
      for (const [re, alts] of [[/ee/, ['i', 'e']], [/oo/, ['u', 'o']]]) {
        const nv = [];
        for (const x of vs) {
          if (re.test(x)) alts.forEach(a => nv.push(x.replace(re, a)));
          else nv.push(x);
        }
        vs = nv.slice(0, 6);
      }
    }
    const out = [];
    for (let x of vs) {
      x = x.replace(/([aeiou])\1+/g, '$1');                       // aa, ii, uu ... are the long forms
      x = x.replace(/([aeiou])m(?=[kgcjtdpbsSvhn]|$)/g, '$1n');     // m after a vowel, before k g c j t d p b s v h n or at the end, is ం
      if (!out.includes(x)) out.push(x);
    }
    // krishna / krushna: a consonant + ri can also be ృ
    for (const x of out.slice()) {
      const y = x.replace(/([^aeiou])ri/, '$1ru');
      if (y !== x && !out.includes(y)) out.push(y);
    }
    return out;
  }

  // ---------------------------------------------------------------- dictionary index
  const EX = Object.create(null), LX = Object.create(null), SQ = Object.create(null);
  (function build() {
    const seen = new Set();
    for (const w of (WORDS + ' ' + EXTRA).split(/\s+/)) {
      if (!w || seen.has(w)) continue;
      seen.add(w);
      const k = teKey(w);
      if (!k) continue;
      (EX[k] || (EX[k] = [])).push(w);
      const l = loose(k);
      (LX[l] || (LX[l] = [])).push(w);
      const q = squash(l);
      (SQ[q] || (SQ[q] = [])).push(w);
    }
  })();

  function lookup(word) {
    const ks = romKeys(word), out = [];
    const push = w => { if (!out.includes(w)) out.push(w); };
    ks.forEach(k => (EX[k] || []).forEach(push));
    ks.forEach(k => (LX[loose(k)] || []).forEach(push));
    ks.forEach(k => (SQ[squash(loose(k))] || []).forEach(push));
    return out;
  }

  // ---------------------------------------------------------------- spelling by sound (for words not in the dictionary)
  const FC = {
    ksh: 'క్ష', chh: 'ఛ', ch: 'చ', kh: 'ఖ', gh: 'ఘ', jh: 'ఝ', th: 'త', dh: 'ధ', ph: 'ఫ', bh: 'భ', sh: 'శ',
    k: 'క', g: 'గ', c: 'క', j: 'జ', t: 'త', d: 'ద', n: 'న', p: 'ప', b: 'బ', m: 'మ', y: 'య', r: 'ర', l: 'ల',
    v: 'వ', w: 'వ', s: 'స', h: 'హ', f: 'ఫ', z: 'జ', q: 'క', x: 'క్స'
  };
  const CK = ['ksh', 'chh', 'ch', 'kh', 'gh', 'jh', 'th', 'dh', 'ph', 'bh', 'sh', 'k', 'g', 'c', 'j', 't', 'd', 'n', 'p', 'b', 'm', 'y', 'r', 'l', 'v', 'w', 's', 'h', 'f', 'z', 'q', 'x'];
  const FCU = { T: 'ట', D: 'డ', N: 'ణ', L: 'ళ', S: 'ష' };      // capital letters inside a word: retroflex sounds
  const VOW = {
    aa: { ind: 'ఆ', mat: 'ా' }, ai: { ind: 'ఐ', mat: 'ై' }, au: { ind: 'ఔ', mat: 'ౌ' },
    ee: { ind: 'ఈ', mat: 'ీ', indB: 'ఏ', matB: 'ే' }, ii: { ind: 'ఈ', mat: 'ీ' },
    oo: { ind: 'ఊ', mat: 'ూ', indB: 'ఓ', matB: 'ో' }, uu: { ind: 'ఊ', mat: 'ూ' },
    a: { ind: 'అ', mat: '' }, e: { ind: 'ఎ', mat: 'ె', indB: 'ఏ', matB: 'ే' }, i: { ind: 'ఇ', mat: 'ి' },
    o: { ind: 'ఒ', mat: 'ొ', indB: 'ఓ', matB: 'ో' }, u: { ind: 'ఉ', mat: 'ు' }
  };
  const VK = ['aa', 'ai', 'au', 'ee', 'ii', 'oo', 'uu', 'a', 'e', 'i', 'o', 'u'];

  // opt.longv: e and o as long ే ో;  opt.retro: t and d as ట డ
  function spell(word, opt) {
    opt = opt || {};
    const hint = /[A-Z]/.test(word.slice(1)) && /[a-z]/.test(word);
    const s = hint ? word.charAt(0).toLowerCase() + word.slice(1) : word.toLowerCase();
    let out = '', i = 0, cons = false;
    while (i < s.length) {
      const ch = s[i], low = s.slice(i, i + 3).toLowerCase(), lc = ch.toLowerCase();
      if (hint && FCU[ch]) {
        let u = FCU[ch]; i++;
        if ((ch === 'T' || ch === 'D') && s[i] === 'h') { u = ch === 'T' ? 'ఠ' : 'ఢ'; i++; }
        if (cons) out += VIRAMA;
        out += u; cons = true; continue;
      }
      // n or m after a vowel, before k g c j t d p b s (or m at the end) is the anusvara ం
      if ((lc === 'n' || lc === 'm') && !cons && out) {
        const nx = s.slice(i + 1, i + 3).toLowerCase(), end = i + 1 >= s.length;
        if ((lc === 'm' && end) || (/^[kgcjtdpbs]/.test(nx) && !(lc === 'm' && nx[0] === 'm'))) { out += 'ం'; i++; continue; }
      }
      let v = null;
      for (const k of VK) if (low.startsWith(k)) { v = k; break; }
      if (v) {
        const e = VOW[v], B = opt.longv && e.indB;
        if (cons) { out += B ? e.matB : e.mat; cons = false; }
        else out += B ? e.indB : e.ind;
        i += v.length; continue;
      }
      let t = null;
      for (const k of CK) if (low.startsWith(k)) { t = k; break; }
      if (t) {
        let u = FC[t];
        if (opt.retro) { if (t === 't') u = 'ట'; else if (t === 'd') u = 'డ'; }
        if (cons) out += VIRAMA;
        out += u; cons = true; i += t.length; continue;
      }
      i++;
    }
    if (cons) out += VIRAMA;
    return out;
  }



  // English words and city names whose English spelling does not follow Telugu sounds
  const ALIAS = {
    action: 'యాక్షన్', scene: 'సీన్', shot: 'షాట్', location: 'లొకేషన్', shooting: 'షూటింగ్', interval: 'ఇంటర్వెల్', climax: 'క్లైమాక్స్',
    hero: 'హీరో', heroine: 'హీరోయిన్', villain: 'విలన్', fight: 'ఫైట్', song: 'సాంగ్', script: 'స్క్రిప్ట్', director: 'డైరెక్టర్',
    producer: 'ప్రొడ్యూసర్', camera: 'కెమెరా', cut: 'కట్', thanks: 'థాంక్స్', thankyou: 'థాంక్యూ', sorry: 'సారీ', please: 'ప్లీజ్',
    hello: 'హలో', hi: 'హాయ్', ok: 'ఓకే', okay: 'ఓకే', bye: 'బై', college: 'కాలేజ్', school: 'స్కూల్', phone: 'ఫోన్', mobile: 'మొబైల్',
    office: 'ఆఫీస్', hospital: 'హాస్పిటల్', doctor: 'డాక్టర్', police: 'పోలీస్', hotel: 'హోటల్', bus: 'బస్సు', car: 'కారు', bike: 'బైక్',
    train: 'ట్రైన్', flight: 'ఫ్లైట్', hyderabad: 'హైదరాబాద్', secunderabad: 'సికింద్రాబాద్', vizag: 'విశాఖపట్నం', bangalore: 'బెంగళూరు',
    bengaluru: 'బెంగళూరు', chennai: 'చెన్నై', mumbai: 'ముంబై', delhi: 'ఢిల్లీ', america: 'అమెరికా', india: 'ఇండియా', telangana: 'తెలంగాణ',
    andhra: 'ఆంధ్ర', family: 'ఫ్యామిలీ', friend: 'ఫ్రెండ్', friends: 'ఫ్రెండ్స్', love: 'లవ్', life: 'లైఫ్', time: 'టైమ్', problem: 'ప్రాబ్లం',
    plan: 'ప్లాన్', party: 'పార్టీ', function: 'ఫంక్షన్', sir: 'సర్', madam: 'మేడమ్', boss: 'బాస్', money: 'మనీ', ticket: 'టికెట్',
    video: 'వీడియో', photo: 'ఫోటో', call: 'కాల్', message: 'మెసేజ్', number: 'నంబర్'
  };

  // ---------------------------------------------------------------- word + ending (ravitho, ammaki, pustakaalu)
  const SUF = [['nundi', 'నుండి'], ['nunchi', 'నుంచి'], ['kosam', 'కోసం'], ['gurinchi', 'గురించి'], ['varaku', 'వరకు'], ['tarvata', 'తర్వాత'], ['meeda', 'మీద'], ['tho', 'తో'], ['lo', 'లో'], ['to', 'తో'], ['ki', 'కి'], ['ku', 'కు'], ['ni', 'ని'], ['nu', 'ను'], ['gaa', 'గా'], ['lu', 'లు'], ['laa', 'లా'], ['ga', 'గా'], ['la', 'ల']];
  function joinStem(st, suf) {
    if (st.endsWith('ం')) {                       // పుస్తకం + కి = పుస్తకానికి
      if (suf === 'కి' || suf === 'కు') return st.slice(0, -1) + 'ానికి';
      if (suf === 'ని' || suf === 'ను') return st.slice(0, -1) + 'ాన్ని';
      if (suf === 'లు') return st.slice(0, -1) + 'ాలు';
      if (suf === 'ల') return st.slice(0, -1) + 'ాల';
    }
    return st + suf;
  }
  function withEnding(word) {
    const lw = word.toLowerCase().replace(/[^a-z]/g, ''), out = [];
    for (const [rom, tel] of SUF.slice().sort((a, b) => b[0].length - a[0].length)) {
      if (lw.length - rom.length < 2 || !lw.endsWith(rom)) continue;
      const stem = lw.slice(0, -rom.length);
      const hit = lookup(stem)[0] || lookup(stem + 'm')[0];
      if (hit) { const w = joinStem(hit, tel); if (!out.includes(w)) out.push(w); }
      else if ((rom === 'ki' || rom === 'ku') && stem.length > 2 && stem.endsWith('i')) {   // ekkada + ki = ekkadiki
        const base = stem.slice(0, -1), h2 = lookup(base + 'a')[0] || lookup(base + 'u')[0];
        if (h2 && h2.endsWith('ు')) out.push(h2.slice(0, -1) + 'ి' + tel);
        else if (h2 && /[\u0C15-\u0C39]$/.test(h2)) out.push(h2 + 'ి' + tel);
      }
      if (out.length >= 2) break;
    }
    return out;
  }

  // ---------------------------------------------------------------- what the user's choices taught us
  const LK = 'fd:te:learn';
  let LEARN = {};
  try { LEARN = JSON.parse(localStorage.getItem(LK)) || {}; } catch (e) { LEARN = {}; }
  function learn(roman, telugu) {
    roman = roman.toLowerCase();
    LEARN[roman] = telugu;
    const ks = Object.keys(LEARN);
    if (ks.length > 3000) delete LEARN[ks[0]];
    try { localStorage.setItem(LK, JSON.stringify(LEARN)); } catch (e) { /* storage full or blocked */ }
  }

  // The best spellings of an English-letter word, best first
  function candidates(word) {
    const out = [];
    const push = w => { if (w && !out.includes(w)) out.push(w); };
    const lw = word.toLowerCase();
    if (LEARN[lw]) push(LEARN[lw]);
    if (ALIAS[lw]) push(ALIAS[lw]);
    const hits = lookup(word);
    hits.slice(0, 3).forEach(push);
    if (!hits.length) withEnding(word).forEach(push);
    push(spell(word));
    push(spell(word, { longv: true }));
    push(spell(word, { retro: true }));
    push(spell(word, { longv: true, retro: true }));
    return out.slice(0, 5);
  }

  const API = { candidates, lookup, spell, teKey, romKeys, learn, withEnding, WORDS: WORDS + ' ' + EXTRA };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.TeluguIME = API;

  // ---------------------------------------------------------------- the editor
  if (typeof document === 'undefined') return;
  const sheet = document.getElementById('sheet');
  if (!sheet) return;

  const SCENEKW = new Set(['int', 'ext', 'day', 'night', 'dawn', 'dusk', 'morning', 'evening', 'afternoon', 'continuous', 'later', 'same', 'moments', 'sunrise', 'sunset']);
  const ONKEY = 'fd:te';
  let on = false;                                          // English is the default; Telugu typing is switched on by choice
  try { on = localStorage.getItem(ONKEY) === '1'; } catch (e) { /* default off */ }

  const lineOf = n => { for (; n && n !== sheet; n = n.parentNode) if (n.parentNode === sheet) return n; return null; };

  // The English-letter word right before the caret, if any
  function tokenAtCaret() {
    const sel = getSelection();
    if (!sel || !sel.rangeCount || !sel.isCollapsed) return null;
    const r = sel.getRangeAt(0), n = r.startContainer;
    if (n.nodeType !== 3 || !sheet.contains(n)) return null;
    const line = lineOf(n);
    if (!line) return null;
    const m = /[A-Za-z`]+$/.exec(n.data.slice(0, r.startOffset));
    if (!m) return null;
    return { node: n, start: m.index, end: r.startOffset, text: m[0], type: line.dataset.type || 'action' };
  }
  function convertible(t) {
    if (t.text[0] === '`') return true;
    if (t.type === 'transition') return false;
    if (t.type === 'scene' && SCENEKW.has(t.text.toLowerCase())) return false;
    if (t.type === 'character' && /^[A-Z]{1,3}$/.test(t.text)) return false;
    return true;
  }
  const sceneKeywordStart = t => t.type === 'scene' && [...SCENEKW].some(k => k.startsWith(t.text.toLowerCase()));

  function replaceRange(node, s, e, text) {
    const sel = getSelection(), r = document.createRange();
    r.setStart(node, s); r.setEnd(node, e);
    sel.removeAllRanges(); sel.addRange(r);
    document.execCommand('insertText', false, text);   // keeps Ctrl+Z working: undo brings the English letters back
  }

  let pickTxt = '', pick = 0;

  function chosen(t) {
    const c = candidates(t.text);
    return c[pickTxt === t.text ? Math.min(pick, c.length - 1) : 0];
  }
  let last = null;                                      // the word that just turned Telugu
  function afterWrite(len) {                            // find the text node and position again after an edit
    const sel = getSelection();
    if (!sel.rangeCount) return null;
    const r = sel.getRangeAt(0);
    return r.startContainer.nodeType === 3 ? { node: r.startContainer, start: r.startOffset - len } : null;
  }
  function commit(t, tail) {
    tail = tail || '';
    if (t.text[0] === '`') {                            // a backtick keeps the word in English
      last = null;
      replaceRange(t.node, t.start, t.end, t.text.slice(1) + tail);
      return;
    }
    const cands = candidates(t.text), idx = pickTxt === t.text ? Math.min(pick, cands.length - 1) : 0;
    const rep = cands[idx];
    if (!rep) return;
    replaceRange(t.node, t.start, t.end, rep + tail);
    const at = afterWrite((rep + tail).length);
    last = at && cands.length > 1 ? { node: at.node, start: at.start, roman: t.text, cands, idx, tail } : null;
  }
  // Ctrl+Space right after a word: swap it for the next spelling, in place
  function nextSpelling() {
    const L = last, sel = getSelection();
    if (!L || !L.node.isConnected || !sel.rangeCount || !sel.isCollapsed) return false;
    const cur = L.cands[L.idx] + L.tail, r = sel.getRangeAt(0);
    if (r.startContainer !== L.node || r.startOffset !== L.start + cur.length || L.node.data.slice(L.start, L.start + cur.length) !== cur) return false;
    L.idx = (L.idx + 1) % L.cands.length;
    const nx = L.cands[L.idx];
    replaceRange(L.node, L.start, L.start + cur.length, nx + L.tail);
    learn(L.roman, nx);                                 // next time this word comes out the way you chose
    const at = afterWrite((nx + L.tail).length);
    if (at) { L.node = at.node; L.start = at.start; } else last = null;
    return true;
  }

  sheet.addEventListener('beforeinput', e => {
    if (!on || e.isComposing || e.inputType !== 'insertText' || !e.data || e.data.length !== 1) return;
    if (/[A-Za-z0-9`]/.test(e.data)) return;               // still typing the word
    const t = tokenAtCaret();
    if (!t || !convertible(t)) return;
    e.preventDefault();
    commit(t, e.data);
  });
  sheet.addEventListener('input', e => {
    if (!on || e.isComposing || e.inputType !== 'insertText' || !e.data || e.data.length !== 1) return;
    if (/[A-Za-z0-9`]/.test(e.data)) return;
    const sel = getSelection();
    if (!sel || !sel.rangeCount || !sel.isCollapsed) return;
    const r = sel.getRangeAt(0), n = r.startContainer, off = r.startOffset;
    if (n.nodeType !== 3 || !sheet.contains(n) || off < 2 || n.data[off - 1] !== e.data) return;
    const m = /[A-Za-z`]+$/.exec(n.data.slice(0, off - 1)), line = lineOf(n);
    if (!m || !line) return;
    const t = { node: n, start: m.index, end: off, text: m[0], type: line.dataset.type || 'action' };
    if (convertible(t)) commit(t, e.data);               // the boundary character is already there, so it is replaced too
  });
  sheet.addEventListener('keydown', e => {
    if (!on || e.isComposing) return;
    if (e.key === 'Enter' || e.key === 'Tab') {
      const t = tokenAtCaret();
      if (t && convertible(t)) commit(t, '');
    } else if (e.ctrlKey && !e.shiftKey && !e.altKey && e.code === 'Space') {
      if (nextSpelling()) e.preventDefault();
    }
  }, true);

  // header: on/off switch and the Telugu font list
  const bEn = document.getElementById('teEn'), bTe = document.getElementById('teTe'), fsel = document.getElementById('teFontSel');
  const loadTe = () => { if (typeof loadFont === 'function') loadFont('te'); };
  function setOn(v) {
    on = v;
    try { localStorage.setItem(ONKEY, on ? '1' : '0'); } catch (e) { /* not important */ }
    paint();
    setAttrs();
    if (on) loadTe();
  }
  function setAttrs() {
    if (on) { sheet.setAttribute('autocorrect', 'off'); sheet.setAttribute('autocapitalize', 'none'); sheet.spellcheck = false; }
    else { sheet.removeAttribute('autocorrect'); sheet.removeAttribute('autocapitalize'); sheet.spellcheck = true; }
  }
  function paint() {
    if (bEn) bEn.setAttribute('aria-pressed', on ? 'false' : 'true');
    if (bTe) bTe.setAttribute('aria-pressed', on ? 'true' : 'false');
  }
  paint();
  setAttrs();
  // each side switches straight to its own language, so you can always go back to English
  [[bEn, false], [bTe, true]].forEach(([b, v]) => {
    if (!b) return;
    b.addEventListener('pointerdown', e => e.preventDefault());     // keep the caret in the script
    b.addEventListener('click', () => setOn(v));
  });
  document.addEventListener('keydown', e => {                       // Ctrl+Shift+T: switch English <-> Telugu typing
    if (e.ctrlKey && e.shiftKey && !e.altKey && e.code === 'KeyT') { e.preventDefault(); setOn(!on); }
  });
  if (on) loadTe();
  if (fsel && typeof TEFONTS !== 'undefined') {
    TEFONTS.forEach(f => fsel.add(new Option(f[0], f[0])));
    fsel.value = TEF;
    fsel.addEventListener('change', () => {
      TEF = fsel.value;
      document.documentElement.style.setProperty('--tef', '"' + TEF + '"');
      try { localStorage.setItem('fd:tefont', TEF); } catch (e) { /* not important */ }
      fontsDone.delete('te');
      loadTe();
    });
  }
})(typeof window !== 'undefined' ? window : globalThis);
