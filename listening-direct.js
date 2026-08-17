(()=>{
const TRACKS={
1:{part1:'Track 01 TEST 1 Part 1.mp3',part3:'Track 03 TEST 1 Part 3.mp3',source:'07'},
2:{part1:'Track 09 TEST 2 Part 1.mp3',part3:'Track 11 TEST 2 Part 3.mp3',source:'08'},
3:{part1:'Track 17 TEST 3 Part 1.mp3',part3:'Track 19 TEST 3 Part 3.mp3',source:'09'},
4:{part1:'Track 25 TEST 4 Part 1.mp3',part3:'Track 27 TEST 4 Part 3.mp3',source:'10'},
5:{part1:'Track 33 TEST 5 Part 1.mp3',part3:'Track 35 TEST 5 Part 3.mp3',source:'11'},
6:{part1:'Track 41 TEST 6 Part 1.mp3',part3:'Track 43 TEST 6 Part 3.mp3',source:'12'},
7:{part1:'Track 49 TEST 7 Part 1.mp3',part3:'Track 51 TEST 7 Part 3.mp3',source:'13'},
8:{part1:'Track 57 TEST 8 Part 1.mp3',part3:'Track 59 TEST 8 Part 3.mp3',source:'14'}
};
const P1={
1:{
1:'Đáp án B – Tuesday. John nói cửa sổ sẽ đến vào Monday và anh có thể đến lắp vào Tuesday. Thursday chỉ là ngày một công việc khác vừa bị hủy; Monday lại được loại vì cửa sổ có thể đến muộn. Vì vậy chi tiết quyết định là “I can come and fit them on Tuesday”.',
2:'Đáp án C – dancing. Người phụ nữ nói thức ăn không ngon và nhạc quá to nên nói chuyện không được, nhưng “I had a nice dance. That was fun.” Vì vậy hoạt động cô thực sự thích là nhảy.',
3:'Đáp án B – sunny. Mưa to và gió mạnh chỉ kéo dài qua đêm rồi “should die out before early morning”; sáng hôm sau sẽ có “clear blue skies with lots of sunshine”. Showers chỉ có thể xuất hiện vào buổi tối.',
4:'Đáp án C – 1:30. 12:30 là giờ đăng ký và uống trà/cà phê; 1:00 là presentation; sau đó tour bệnh viện bắt đầu lúc 1:30. Cần phân biệt ba mốc giờ liên tiếp.',
5:'Đáp án A – driving lessons. Cô con gái nói mình chưa sẵn sàng học lái xe. Granddad đã cho tiền và cô chọn chiếc váy, nên thứ cô KHÔNG nhận là driving lessons.',
6:'Đáp án B – Medium. Anh ấy thường mặc medium; chiếc áo hiện tại tuy ghi medium nhưng quá nhỏ. Khi được đề nghị đổi large, anh ấy lại muốn tìm “something else in a medium”.',
7:'Đáp án A – mobile-phone use. Cảnh sát tuần tới sẽ kiểm tra người lái xe dùng điện thoại. Seat belts và speeding được nhắc đến như hai chiến dịch trước đây, nên là distractors.'},
2:{
1:'Đáp án B – pasta. Pizza được để cho Helen; người em trai có thể ăn pasta; người bố sẽ mua fish and chips trên đường về. Câu hỏi hỏi riêng món của em trai.',
2:'Đáp án C – people talking. Người đàn ông thích bộ phim và không phàn nàn về độ dài; điều anh ước đã không xảy ra là những người ngồi phía trước “spent the whole film talking”.',
3:'Đáp án C – 10:00. Tai nạn xảy ra khoảng 6:00 và bản tin tiếp theo là 8:30, nhưng đường được dự kiến mở lại “until at least ten”. Vì vậy thời điểm đường có thể dùng lại là 10:00.',
4:'Đáp án A – £120. £150 là giá tuần trước; website hiển thị £180 nhưng nhân viên xác nhận đó là lỗi. Giá khứ hồi trong tuần khuyến mãi là £120.',
5:'Đáp án B – Gardener’s World. Football được chuyển lên Channel 1, khiến Gardener’s World “will not be shown this week”. Police drama Suspect vẫn phát trên Channel 2.',
6:'Đáp án B – Thursday. Wednesday chỉ có một lecture, Friday cũng chỉ có một lecture lúc 8:00; Thursday có một buổi sáng và một buổi chiều nên là ngày nhiều lecture nhất.',
7:'Đáp án A – hot meals. Do sửa chữa, nhóm “unable to serve hot meals until Friday”. Sandwiches và tea/coffee vẫn có, vì vậy chỉ hot meals là không phục vụ.'},
3:{
1:'Đáp án C – July 8. June 30 bị loại vì một số tiết mục không tham gia được; July 7 là ngày của năm trước. Năm nay cùng thời điểm đó rơi vào Saturday July 8.',
2:'Đáp án C – higher salary/money. Công ty cũ vẫn hỗ trợ nghỉ ốm và training; lý do quyết định chuyển việc là công ty mới “offered me a higher salary”.',
3:'Đáp án A – use/check the website. Với lỗi kết nối điện thoại, thông báo yêu cầu khách hàng “Please check our website for the latest updates”. Email chỉ dành cho một loại inquiry khác.',
4:'Đáp án B – transport the garden waste. Người làm vườn có thể cắt cỏ và cho đồ tái chế vào túi, nhưng không có phương tiện nên không thể mang chúng tới recycling centre. Đây là hành động anh ấy nói mình không làm được.',
5:'Đáp án B – frozen foods. Quần áo chỉ là hàng mới; hoa chỉ là gợi ý mua quà. Frozen food mới được nói rõ là “at half price”, tức special offer.',
6:'Đáp án C – 4:00. Jamie có thể rời college lúc 3:00, bắt chuyến 3:15 và “get to you by four”. Do đó thời gian anh đề nghị gặp thực tế là 4:00.',
7:'Đáp án A – go to the ticket office. Hành khách đi chuyến 10:15 có thể dùng vé cũ nhưng “should go to the ticket office for seat reservations”. Coach stop chỉ dành cho người chọn xe coach sớm hơn.'},
4:{
1:'Đáp án B – the gym. Người nói không đến museum vì thiếu thời gian, không phải vì museum đóng. Gym mới là hoạt động “wasn’t open”; swimming pool vẫn dùng được.',
2:'Đáp án C – bus. Bình thường anh đi train; car chỉ dùng cuối tuần. Khi trains delayed và sợ muộn giờ làm, anh “sometimes” dùng bus.',
3:'Đáp án C – art gallery. Flats và library chỉ là các phương án từng được bàn; kết luận cuối cùng là tòa nhà “is going to be used as a local art gallery”.',
4:'Đáp án B – six-month membership. Đăng ký 6 tháng cho “free entrance to listen to an author talk”, tức được tham dự presentation. 12 tháng cho quyền hỏi tác giả online, là lợi ích khác.',
5:'Đáp án C – Wednesday. Monday không còn PC; Tuesday là ngày cô thường đến nhưng tuần này bận. Cô hỏi trực tiếp “whether Wednesday was possible”.',
6:'Đáp án A – meet Jim for coffee. Anh định mua quà nhưng Jim gọi rủ cà phê. Vì Sunday có khách nên anh quyết định gặp Jim Saturday như kế hoạch và mua quà vào cuối tuần sau.',
7:'Đáp án A – biscuits. Anh đã mua biscuits cho mẹ năm ngoái và “She liked them”, nên đây là món mẹ đã thử. Cheese và chocolate chỉ đang được cân nhắc.'},
5:{
1:'Đáp án B – the broken garage window. Chi tiết cần xử lý là cửa sổ garage bị cành cây làm vỡ và người đàn ông sẽ gọi người tới xem vào ngày mai. Cành cây/gate chỉ giúp giải thích nguyên nhân và vị trí.',
2:'Đáp án A – running shorts. Trainers đã mua trong đợt sale trước; socks có thể rẻ hơn online. Cửa hàng nói rõ “planning to reduce some of our running shorts next week”.',
3:'Đáp án B – Saturday. Anh rời đi Friday và về Sunday, còn “The course begins on Saturday”. Accommodation Friday night không phải ngày khai giảng.',
4:'Đáp án C – small wooden knives and forks. Plates đã đủ; cups có thể vẫn còn trong cupboard. Knives and forks tuy có đủ nhưng không phù hợp cho trẻ, nên cần loại nhỏ bằng gỗ.',
5:'Đáp án C – a credit card. Anh làm rơi wallet nhưng tưởng đã nhặt đủ; sau đó phát hiện “there’s a credit card missing”. Mobile chỉ là số liên hệ trên notice board.',
6:'Đáp án A – Greece. Italy là nơi gia đình đi năm ngoái; Spain từng được cân nhắc. Cuối cùng họ “agreed on Greece”.',
7:'Đáp án B – Platform 11. Chuyến 9:30 đi London được đổi từ Platform 10 sang Platform 11. Platform 14 là nơi chuyến tàu từ London đến lúc 9:45.'},
6:{
1:'Đáp án A – kitchen table. Người đàn ông nói lần cuối anh nhớ chắc là đặt chìa khóa trên kitchen table. Bed và chair chỉ là những khả năng anh suy đoán sau đó.',
2:'Đáp án C – fruit. Anh thừa nhận ăn nhiều cheese và sẽ giảm bread, nhưng kế hoạch tăng thực phẩm là mang một quả apple đi làm mỗi ngày, tức ăn nhiều fruit hơn.',
3:'Đáp án A – tennis. Kế hoạch cycling buổi sáng bị hủy vì bạn không đi được; chồng chơi golf. Cuối cùng cô đồng ý lịch chơi tennis vào lunchtime.',
4:'Đáp án A – sofa. Cô từng xem rugs nhưng “changed my mind”; sau đó hỏi kích thước chiếc sofa vì muốn biết có vừa phòng không.',
5:'Đáp án B – heavy rain. Snow được dự báo trước đó nhưng nay không chắc xuất hiện; wind sẽ nhẹ hơn. Heavy rain là lý do trực tiếp khiến chuyến đi bộ bị hủy.',
6:'Đáp án C – taking photographs. Trẻ con thích swimming pool nhưng người phụ nữ không bơi. Cô nói “I had the best time of all taking some photographs”, nên đây là điều cô thích nhất.',
7:'Đáp án A – Wednesday. Thursday có khách nên không thể đi; Friday quá đông. Wednesday tuy thường khó nhưng tuần đó anh tan làm sớm và đề nghị gặp ngày này.'},
7:{
1:'Đáp án C – 3:30. Salon có 1:30 và 3:30; người đàn ông nói 1:30 tốt nhưng không kịp vào town rồi chốt “3.30 then”. 12:30 chỉ là mốc hết lịch kín buổi sáng.',
2:'Đáp án B – her son’s motorbike was stolen. Xe ô tô đã lấy từ garage và visitor đến bằng train không phải nguyên nhân. Cô phải quay lại chờ police vì motorbike của con bị trộm.',
3:'Đáp án B – basketball. Anh xem football trực tiếp tại sân và sau đó xem swimming trên TV. Basketball là môn anh muốn xem khi về nhà nhưng trẻ con đang xem film.',
4:'Đáp án A – trains/railway. Police nói motorways hiện không có vấn đề; flights chưa bị hủy. Trains có thể bị ảnh hưởng nếu mực nước tiếp tục tăng.',
5:'Đáp án B – 18 people. 30 là số người được mời; 7 là số công ty cung cấp đồ ăn anh có số điện thoại. Chỉ khoảng 18 người đã phản hồi xác nhận.',
6:'Đáp án B – tea. Cô trả coffee vì nguội và thấy quá strong, sau đó hỏi “Is there any chance of having tea instead?”. Water đã uống cùng coffee nên không mua thêm.',
7:'Đáp án C – 1 September. Có thể chuyển vào từ 11 August nhưng cô đi công tác tới 18 August; cô hỏi có thể chờ đến 1 September và bắt đầu trả rent từ đó hay không.'},
8:{
1:'Đáp án A – 8:30. Receptionist có thể hỗ trợ từ 8:30; doctor bắt đầu gặp bệnh nhân lúc 9:00 và một doctor khác có thể nghe điện thoại từ 9:30.',
2:'Đáp án C – March. Packet nói có thể bắt đầu February, nhưng người tư vấn cho rằng nên chờ đến March vì đất khô hơn. January đã từng thất bại do đất quá ướt.',
3:'Đáp án B – online. Anh thử áo ở shop nhưng quá đắt; áo ở market chất lượng kém. Cuối cùng “I looked online and got this one”.',
4:'Đáp án A – £25. £60 là gói family four people; £15 dành cho children under 14. Một adult single ticket có giá £25.',
5:'Đáp án C – microwave. Iron hóa ra vẫn hoạt động và kettle cũng đang dùng. Microwave cần thay vì “the door doesn’t shut properly”.',
6:'Đáp án B – cinema. Stadium tour chỉ có Wednesday và museum bị Jamie từ chối. Người đàn ông đề nghị cả gia đình “go and see a film together”.',
7:'Đáp án A – the 13th. Họ gặp Janine ngày 15 và party ngày 16, nhưng lời thoại xác nhận birthday của cô là ngày 13.'}
};
const P3={
1:{14:'Đáp án “shopping”. Câu dẫn hỏi vai trò của người tiêu dùng; Erica nói “as people who go shopping, we have a lot of power”. Sau “when we’re …” cần V-ing, nên shopping vừa đúng nội dung vừa đúng cấu trúc.',15:'Đáp án “plastic bags”. Erica bảo không vứt các túi nhựa ở nhà mà cất lại “until your next shopping trip and use them then”. Sau “Take … with you” cần một danh từ/cụm danh từ chỉ vật mang theo.',16:'Đáp án “charity shops”. Erica nói các charity shops rất vui giúp bạn recycle old clothes hoặc đồ trong nhà. Đây là nơi nhận các vật bạn không còn cần.',17:'Đáp án “environmental”. Cụm trong audio là “local environmental problems”. Ô trống đứng trước “problems”, vì vậy cần adjective environmental.',18:'Đáp án “rivers”. Erica gợi ý cùng bạn bè “clear the rubbish from local rivers” và nhặt litter trên streets. Hai địa điểm được đặt song song là rivers và streets.',19:'Đáp án “neighbour”. Câu audio: “if you work in the same area as your neighbour, try car-sharing”. Sau possessive “your” cần noun chỉ người, neighbour.'},
2:{14:'Đáp án “changes”. Jonathan mở đầu bằng “There are a few changes to our regular programmes”. “There are” yêu cầu danh từ số nhiều, khớp changes.',15:'Đáp án “wild flowers”. Chương trình wildlife lần này nói về cách “recognise the wild flowers in our gardens”. Đây là object của identify/recognise.',16:'Đáp án “published”. Chuyên gia sẽ nói cách dùng internet để “get your next book published”. Cấu trúc causative/resultative “get + object + past participle” → get your work published.',17:'Đáp án “cancelled”. Các trận Saturday trước “were cancelled due to the terrible weather”, nên không có reports. Sau “were” cần past participle trong passive.',18:'Đáp án “10.00 / 10 am”. Money Matters “starting from ten, not the usual nine”. “Not the usual nine” là distractor đối lập trực tiếp.',19:'Đáp án “library”. Sally sẽ ở “the main door of the library”, không phải Town Hall vì nơi đó đang đóng do building work.'},
3:{14:'Đáp án “different building”. Sandra nói một số training sessions “may have to be held in a different building”. Sau “in a …” cần cụm danh từ số ít.',15:'Đáp án “13 September”. Danh sách đầy đủ người tham gia từng session sẽ được email “on the 13th of September”. Đây là thông tin ngày tháng, không phải ngày training.',16:'Đáp án “exercises”. Materials có tasks để chuẩn bị và Sandra yêu cầu “complete the exercises before you attend”. Sau “the” cần noun plural phù hợp với nội dung tài liệu.',17:'Đáp án “training manager”. Sau khi hoàn thành questionnaire, nhân viên phải “give it to the training manager”. Restaurant manager được nhắc ở đoạn khác về dietary requirements.',18:'Đáp án “restaurant / company restaurant”. Vì nhân viên restaurant cũng đi training nên “the restaurant will not be open”. Đây là địa điểm bị đóng trong ngày training.',19:'Đáp án “134”. Sandra yêu cầu kiểm tra notice board “outside room 134” để xem last-minute changes. Đây là room number nên chỉ ghi số.'},
4:{14:'Đáp án “interview”. Speakers Club phù hợp với người cần luyện presentation “for a job interview”. Sau article “an” cần singular noun bắt đầu bằng nguyên âm trong phát âm: interview.',15:'Đáp án “entertainment”. Các experienced speakers đến từ “the world of business or entertainment”. Hai noun business và entertainment được nối song song bằng or.',16:'Đáp án “7.00 / 7 pm”. “A typical session starts at seven with tea, coffee and biscuits.” Đây là giờ bắt đầu session, không phải giờ của một hoạt động sau đó.',17:'Đáp án “speech competitions”. Thành viên được mời “enter one of our speech competitions each year”. Sau “one of our” thường theo sau bởi plural noun phrase.',18:'Đáp án “free”. Người mới có thể “attend their first session for free”, nhưng phải reserve a place trước. Free là adjective/adverbial complement chỉ không mất phí.',19:'Đáp án “£170”. “Annual membership is £170 per year”; sau đó mới nói có thể chia phí ra trả mỗi tháng. Vì câu hỏi hỏi annual cost nên £170 là đáp án.'},
5:{14:'Đáp án “two days”. William nói đã tham gia “a two-day photography course”. Khi chuyển từ adjective compound “two-day” sang sau động từ “lasted”, ta dùng noun phrase “two days”.',15:'Đáp án “height”. Camera cần ở “the same height as the person”. Cấu trúc cố định: the same + noun + as.',16:'Đáp án “plain”. Người chụp nổi bật hơn nếu background “is as plain as possible”. Ô trống đứng trước background nên cần adjective plain.',17:'Đáp án “accurate”. Dùng daylight sẽ “make the colours more accurate”. Cấu trúc make + object + adjective → colours accurate.',18:'Đáp án “reading”. William gợi ý chụp khi đối tượng không biết, “perhaps they’re reading or looking out of the window”. Hai V-ing forms song song.',19:'Đáp án “three photos”. Khuyến nghị là “take at least three photos of people every day”. “At least” giúp xác định đây là số lượng tối thiểu, không phải tổng số ảnh của khóa học.'},
6:{14:'Đáp án “1576”. Ellen nói “for a full programme of events, text 1576”. Đây là số cần nhắn tin để nhận link thông tin.',15:'Đáp án “climbing”. Activity Centre có “climbing for beginners” và hoạt động này diễn ra indoors. Sau “indoor” cần noun/gerund naming an activity.',16:'Đáp án “coast path”. Trung tâm tổ chức “a walk along the coast path” để quan sát local creatures/wildlife.',17:'Đáp án “13 / 13th”. Special open day diễn ra “on the 13th of June”. Vì sau ô trống đã có June, chỉ cần ngày 13.',18:'Đáp án “celebrity”. History Group walk cho biết nơi “a very well-known celebrity was born”. Sau adjective “famous/well-known” cần noun chỉ người.',19:'Đáp án “poetry”. Book Festival có Q&A cho người “interested in writing poetry”. “Writing + noun” ở đây chỉ thể loại sáng tác.'},
7:{14:'Đáp án “pet”. Thursday Special Buy có “a special gift for your pet”. Sau possessive “your” cần noun pet.',15:'Đáp án “cleaners”. Milburn’s có trainee manager programme và “several jobs for cleaners”. “Jobs for” dẫn tới danh từ chỉ nghề/người số nhiều.',16:'Đáp án “magazine”. Muốn biết cách apply, hãy “pick up our magazine at the exit”. Đây là tài liệu cung cấp details about how to apply.',17:'Đáp án “10.30 / 10:30 pm / 22:30”. Supermarket sẽ mở “until 10:30 on Friday evening”. Mốc 1st/2nd thuộc lịch đóng mở New Year, không trả lời giờ.',18:'Đáp án “Children’s Theatre”. Tháng này cửa hàng hỗ trợ “the local Arts Project and the Children’s Theatre Group”. Ô trống đứng trước Group nên ghi Children’s Theatre.',19:'Đáp án “ticket”. Khi thanh toán, khách “will be given a ticket”; khách bỏ ticket vào box của tổ chức muốn ủng hộ để cửa hàng quy đổi thành tiền.'},
8:{14:'Đáp án “accommodation”. Sinh viên cần mang toàn bộ documentation trường đã gửi “about your course or accommodation”. Hai danh từ course và accommodation song song sau about.',15:'Đáp án “damaged”. Khi vào phòng, phải report “anything that looks damaged”. Sau linking verb looks dùng adjective/past participle adjective damaged.',16:'Đáp án “kitchen”. Để gặp người mới, đừng ở lì trong phòng mà “go to the kitchen”, nơi đầu tiên để giới thiệu bản thân với sinh viên khác.',17:'Đáp án “different subjects”. Clubs and societies giúp bạn gặp “students doing different subjects”. “Different” bổ nghĩa cho plural noun subjects.',18:'Đáp án “five / 5”. Lời khuyên là giới hạn đăng ký “to a maximum of five groups”. “Maximum” báo hiệu đây là giới hạn trên.',19:'Đáp án “local doctor”. Cần “registering with the local doctor as soon as you can”. Weekly shopping và shared fridge là các lời khuyên sau đó, không phải nơi đăng ký.'}
};
function ctx(){
  const tb=document.querySelector('#listeningTabs [data-ltest].active');
  const pb=document.querySelector('#listeningContent [data-lpart].active');
  return {test:Number(tb?.dataset.ltest||1),part:pb?.dataset.lpart||'part1'};
}
function remoteUrl(test,part){const s=TRACKS[test].source;return `https://englishpracticetest.net/wp-content/uploads/2021/11/pet-practice-listening-test-${s}-part-${part==='part1'?'1':'3'}.mp3`;}
function syncAudio(){
  const audio=document.getElementById('listenAudio');if(!audio)return;
  const {test,part}=ctx(),meta=TRACKS[test];if(!meta)return;
  const name=meta[part],key=`${test}-${part}`;if(audio.dataset.directKey===key)return;
  audio.dataset.directKey=key;audio.preload='metadata';
  const local=`audio/listening/${encodeURIComponent(name)}`;
  audio.onerror=()=>{if(audio.dataset.fallback==='1')return;audio.dataset.fallback='1';audio.src=remoteUrl(test,part);audio.load();};
  audio.dataset.fallback='0';audio.src=local;audio.load();
  const picker=document.querySelector('#listeningContent .filepick');if(picker)picker.style.display='none';
  const status=document.querySelector('#listeningContent .asset-status');if(status)status.textContent=`${name} · audio trực tiếp`;
  const play=document.getElementById('playCurrent');if(play)play.textContent=`▶ Phát ${part==='part1'?'Part 1':'Part 3'}`;
}
function enhanceFeedback(){
  const {test,part}=ctx(),map=part==='part1'?P1[test]:P3[test];if(!map)return;
  if(part==='part1'){
    document.querySelectorAll('#listeningContent [data-instant^="listen-"]').forEach(card=>{
      const id=Number(card.dataset.instant.split('-').pop()),rule=card.querySelector('.instant-feedback.show .rule');if(rule&&map[id])rule.textContent=map[id];
    });
  }else{
    document.querySelectorAll('#listeningContent [data-fill]').forEach(card=>{
      const id=Number(card.dataset.fill),rule=card.querySelector('.instant-feedback.show .rule');if(rule&&map[id])rule.textContent=map[id];
    });
  }
}
function after(){setTimeout(()=>{syncAudio();enhanceFeedback();},0);}
document.addEventListener('DOMContentLoaded',()=>{
  if(window.LISTENING_REVIEW)window.LISTENING_REVIEW.forEach(t=>t.hasScript=true);
  after();
  document.addEventListener('click',e=>{if(e.target.closest('[data-view="listening"],#listeningPage [data-ltest],#listeningPage [data-lpart],#listeningPage [data-checkfill]'))after();});
  document.addEventListener('change',e=>{if(e.target.closest('#listeningPage'))after();});
  document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('#listeningPage [data-fillinput]'))after();});
});
window.LISTEN_AUDIO_TRACKS=TRACKS;
})();
