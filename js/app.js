"use strict"

let secondArr = [];
let arr = [];
let newArr = [];
let opNew = [];
let sortHorn = [];
let sortText = [];

const getAjax = {
  method: "get",
  datatype: "json",
};
// constructor of products 
function Product(title, image_url, description, keyword, horns) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  arr.push(this);
}
// function to sort the array based on text letters
function sortByText() {
  $.ajax("./data/page-1.json").then((data) => {
    data.forEach((val, idx) => {
      sortText.push(val);
    });
    // console.log(data);
    data.sort((a,b) => {
      if (a.title.toUpperCase() > b.title.toUpperCase()){
        return 1;
      } else if (a.title.toUpperCase() < b.title.toUpperCase()){
        return -1;
      } else {
        return 0;
      }
    });
    sortText = data;
    console.log(sortText);
  });
}
// function to sort the array based on the horns
function sortByHorns() {
  $.ajax("./data/page-1.json").then((data) => {
    data.forEach((val, idx) => {
      sortHorn.push(val);
    });
    // console.log(data);
    data.sort((a,b) => {
      if (a.horns < b.horns){
        return 1;
      } else if (a.horns > b.horns){
        return -1;
      } else {
        return 0;
      }
    });
    sortHorn = data;
    console.log(sortHorn);
  });
}
// method to render the card products
Product.prototype.renderCard = function () {
  let musTemplate = $('#animalContainer').html();
  let newProduct = Mustache.render(musTemplate, this);
  $('main').append(newProduct);
  return newProduct;
}

// function to load page one
function getPageOne() {
  $.ajax("./data/page-1.json").then((data) => {
    arr = []
    data.forEach((val, idx) => {
      let animal = new Product(val.title, val.image_url, val.description, val.keyword, val.horns);
      animal.renderCard();
      animal.renderOptions();
    });
  });
}
// function to load page tow
function getPageTow() {
  arr = [];
  $.ajax("./data/page-2.json").then((data) => {
    data.forEach((val, idx) => {
      let obJsecond = new Product(val.title, val.image_url, val.description, val.keyword, val.horns);
      obJsecond.renderCard();
      if (!newArr.includes(val.keyword)) {
        opNew.push(val.keyword);
      }
    });
  });
}

// method to render th option list
Product.prototype.renderOptions = function () {
  if (!newArr.includes(this.keyword)) {
    newArr.push(this.keyword);
    $('#select1').append(`<option id = "${this.keyword}" value = "${this.keyword}" >${this.keyword}</option>`);
  }
  // console.log(newArr);
}
// event to filter the result based on the title
$('#select1').on("change", (evnt) => {
  $('main').empty();
  let md = "";
  $("#select1 option:selected").each(function () {
    md = $(this).text();
  });
  if (md === 'Filter by Keyword') {
    location.reload();
  }
  arr.forEach((item, i) => {
    if (md === item.keyword) {
      item.renderCard();
    }
  })
});
// event to render page tow
$('#page2').click(() => {
  $('main').html('');
  $('#select1').html('');
  getPageTow();
  $('#select1').append(`<option value="default">Filter by Keyword</option>`);
  opNew.forEach((val, idx) => {
    $('#select1').append(`<option id = "${val}" value = "${val}" >${val}</option>`);
  });
  console.log(opNew);
  opNew = [];
});
// event to render page one
$('#page1').click(() => {
  $('main').html('');
  $('#select1').html('');
  getPageOne();
  $('#select1').append(`<option value="default">Filter by Keyword</option>`);
  newArr.forEach((val, idx) => {
    $('#select1').append(`<option id = "${val}" value = "${val}" >${val}</option>`);
  });
  console.log(newArr);
});
// event to sort the page based on the the text
$('#sortText').click(() => {
  $('main').html('');
  sortText.forEach((val, idx) => {
    let obJ = new Product(val.title, val.image_url, val.description, val.keyword, val.horns);
    obJ.renderCard();
  });
});
// event to sort the page based on the the horns
$('#sortHorns').click(() => {
  $('main').html('');
  sortHorn.forEach((val, idx) => {
    let obJ = new Product(val.title, val.image_url, val.description, val.keyword, val.horns);
    obJ.renderCard();
  });
});

// console.log(arr);
sortByText();
sortByHorns();
// console.log(arr);

getPageOne();