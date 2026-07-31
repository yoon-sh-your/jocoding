// =====================
// 페이지 전환
// =====================

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





// =====================
// Teachable Machine
// =====================


const URL =
"https://teachablemachine.withgoogle.com/models/lEIL44Xhr/";


let model;



async function loadModel(){

    const modelURL =
    URL + "model.json";


    const metadataURL =
    URL + "metadata.json";


    try{

        model =
        await tmImage.load(
            modelURL,
            metadataURL
        );


        console.log(
        "✅ 모델 로딩 완료"
        );


    }
    catch(error){

        console.log(
        "모델 오류",
        error
        );

    }


}


loadModel();





// =====================
// 이미지 업로드
// =====================


const upload =
document.getElementById(
"imageUpload"
);



upload.addEventListener(
"change",
function(e){


    const file =
    e.target.files[0];


    if(!file)
    return;



    const reader =
    new FileReader();



    reader.onload =
    function(event){


        const img =
        document.getElementById(
        "previewImage"
        );


        img.src =
        event.target.result;


    }



    reader.readAsDataURL(file);


});






// =====================
// AI 분석
// =====================


async function predict(){



const img =
document.getElementById(
"previewImage"
);



if(!img.src){

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





document.getElementById(
"result"
).innerHTML="";






try{


const prediction =
await model.predict(
img
);



console.log(
prediction
);





prediction.sort(
(a,b)=>
b.probability -
a.probability
);





const best =
prediction[0];






document.getElementById(
"result"
).innerHTML=

`

<div>

🎉 결과

</div>


<h2>

${best.className}

</h2>


<p>

확률 :

${

(best.probability*100)
.toFixed(2)

}%

</p>


`;




}

catch(error){


console.error(error);


document.getElementById(
"result"
).innerHTML=

"❌ 분석 오류 발생";


}




}