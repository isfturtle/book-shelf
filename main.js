var books = [];

var renderBooks = function() {
  //console.log("rendering books");
  $('.books').empty();
  var source = $("#book-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < books.length; i++) {
    var newHTML = template(books[i]);
    $(".books").append(newHTML);
  }
};

$('.search').on('click', function() {
  var search = $('#search-query').val().trim();
  search=search.split(" ").join("+")
  fetch(search);
});

var fetch = function(query) {
  console.log("Searching; query="+query);
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q="+query,
    dataType: "json",
    success: function(data) {
      //console.log("API Call Success");
      books = [];
      addBooks(data);
      renderBooks();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var addBooks = function(data) {
  for (var i = 0; i < data.items.length; i++) {
    var volumeInfo = data.items[i].volumeInfo;
    if(volumeInfo.authors && volumeInfo.industryIdentifiers){
    books.push({
      title: volumeInfo.title,
      author: volumeInfo.authors[0],
      imageURL: volumeInfo.imageLinks.thumbnail,
      isbn: volumeInfo.industryIdentifiers[0].identifier,
      pageCount: volumeInfo.pageCount
    });
  }
  }
}
