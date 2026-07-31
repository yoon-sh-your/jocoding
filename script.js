// =========================
// 페이지 토글
// =========================


function showPage(page){


    const animal =
    document.getElementById("animalPage");
    
    
    const contact =
    document.getElementById("contactPage");
    
    
    
    if(page==="animal"){
    
    
    animal.style.display="block";
    
    contact.style.display="none";
    
    
    }
    
    else{
    
    
    animal.style.display="none";
    
    contact.style.display="block";
    
    
    }
    
    
    }
    
    
    
    
    
    // =========================
    // Teachable Machine
    // =========================
    
    
    const URL = 
    "https://teachablemachine.withgoogle.com/models/c0ZAn3cpk/";
    
    
    
    let model;
    
    
    
    async function loadModel(){
    
    
    const modelURL =
    URL + "model.json";
    
    
    const metadataURL =
    URL + "metadata.json";
    
    
    
    model = await tmImage.load(
    modelURL,
    metadataURL
    );
    
    
    
    console.log(
    "AI 모델 로딩 완료"
    );
    
    
    }
    
    
    
    loadModel();
    
    
    
    
    
    
    
    
    // 이미지 미리보기
    
    
    const upload =
    document.getElementById(
    "imageUpload"
    );
    
    
    
    upload.addEventListener(
    "change",
    (e)=>{
    
    
    const file =
    e.target.files[0];
    
    
    
    const reader =
    new FileReader();
    
    
    
    reader.onload =
    function(event){
    
    
    document
    .getElementById("previewImage")
    .src =
    event.target.result;
    
    
    }
    
    
    
    reader.readAsDataURL(file);
    
    
    
    }
    
    );
    
    
    
    
    
    
    
    
    
    // =========================
    // AI 분석
    // =========================
    
    
    async function predict(){
    
    
    
    const image =
    document.getElementById(
    "previewImage"
    );
    
    
    
    if(!image.src){
    
    
    alert(
    "사진을 먼저 업로드해주세요."
    );
    
    
    return;
    
    
    }
    
    
    
    if(!model){
    
    
    alert(
    "AI 모델 로딩중입니다."
    );
    
    
    return;
    
    
    }
    
    
    
    const prediction =
    await model.predict(image);
    
    
    
    prediction.sort(
    (a,b)=>
    b.probability-a.probability
    );
    
    
    
    const result =
    prediction[0];
    
    
    
    let text;
    
    
    
    if(
    result.className.includes("강아지")
    ||
    result.className.includes("Dog")
    ){
    
    
    text="🐶 강아지상";
    
    
    }
    
    else{
    
    
    text="🐱 고양이상";
    
    
    }
    
    
    
    document
    .getElementById("result")
    .innerHTML=`
    
    ${text}
    
    <br>
    
    정확도 :
    
    ${(result.probability*100).toFixed(1)}%
    
    `;
    
    
    
    }