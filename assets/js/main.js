  var templatesUrl = 'https://api.kadporastembicu.dev/v1/templates';
  var templatesDiv = $('#templatesList');

  $.ajax({
     type: 'GET',
     url: templatesUrl,
     success: function(templates) {
        $.each(templates, function(i, template){
           templatesDiv.append('<div class="col-md-4"><div class="card text-center"><h3 class="card-title">' + template.name + '</h3><p class="description">' + template.description + '</p><ul id="templateFeatures' + i + '" class="text-left"></ul><h3 class="price">' + template.price + '</h3><button class="btn btn-default">Select</button></div></div>');
           $.each(template.features, function(e, feature){
              $('#templateFeatures'+i).append('<li>' + feature + '</li>')
           });
        });
     }
  });


  var productsUrl = 'https://api.kadporastembicu.dev/v1/products';
  var productsDiv = $('#productsList');

  $.ajax({
     type: 'GET',
     url: productsUrl,
     success: function(products) {
        $.each(products, function(i, product){
           productsDiv.append('<div class="col-sm-3"><div class="prod-card text-center"><h3 class="title">' + product.name + '</h3><p class="description">' + product.description + '</p><ul id="features' + i + '" class="text-left"></ul><h3 class="price">' + product.price + '</h3><button class="btn btn-default">Select</button></div></div>');
           $.each(product.features, function(e, feature){
              $('#features'+i).append('<li>' + feature + '</li>')
           });
        });
     }
  });




  $(document).ajaxStop(function() {
      var productButton = $('.prod-card button');
      productButton.click(function() {
        $(this).parent().toggleClass('selected');

        var selectedProducts = $('#productsList .prod-card.selected');
        var productNumber =  $('#number');
        var productLength =  $('#productsList .prod-card.selected').length;
        var productsNextButton = $('#Products .btn-next');

        $('#selectedProducts').empty();
        selectedProducts.clone().appendTo('#selectedProducts');

        productNumber.html('(' + productLength + ')');

        if (productLength == 0) {
          productNumber.empty();
          productsNextButton.addClass('disabled');
        } else {
          productsNextButton.removeClass('disabled');
          $('#templatesList .col-md-4').removeClass('selected');
        }

      });
  });

  $(document).ajaxStop(function() {
      var templateButton = $('.card button');

      templateButton.click(function() {
        if ($(this).closest('.col-md-4').hasClass('selected')) {
            $(this).closest('.col-md-4').removeClass('selected');
        } else {
             $('#templatesList .col-md-4').removeClass('selected');
             $(this).closest('.col-md-4').addClass('selected');
        }


        var selectedTemplate = $('#templatesList .col-md-4.selected');
        var templateLength = $('#templatesList .col-md-4.selected').length;
        var templateNextButton = $('#Templates .btn-next');
        var productNumber =  $('#number');

        $('#selectedTemplate').empty();
        selectedTemplate.clone().appendTo('#selectedTemplate');

        if (templateLength == 1) {
          templateNextButton.removeClass('disabled');
           $('.prod-card').removeClass('selected');
           productNumber.empty();
        } else {
          templateNextButton.addClass('disabled');
        }

      });
  });






