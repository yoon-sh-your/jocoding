function showPage(page){


  const animal =
  document.getElementById(
      "animalPage"
  );


  const contact =
  document.getElementById(
      "contactPage"
  );



  if(page==="animal"){

      animal.style.display="block";
      contact.style.display="none";

  }


  else{

      animal.style.display="none";
      contact.style.display="block";

  }

}