
	$('#scrape').on('click', function() {
	
		$.get('/scrape', function(data) {
			console.log(data);
		}).then(function(data) {
			for (i = 0; i < data.length; i++) {
				
				$('#articleContainer').append(
					"<div class='well'>"
                    	+ "<a href='" + data[i].url + "'>" + data[i].headline + "</a>"
                    	+ "<button class='btn btn-info pull-right' data-id='" + data[i]._id + "' style='padding: 5px;'>Save Article</button>"
                	+ "</div>"
                );
			}
		});
	});

	$('#articleContainer').on('click', '.btn', function() {

		var articleData = {
			headline: $(this).parents('.well').find('a').text(),
			url: $(this).parents('.well').find('a').attr('href'),
			_id: $(this).attr('data-id')
		};

		//console.log(articleData);

		$.post('/addToSaved', articleData, function(data) {
			console.log(data);
		});
	});

	$.get('/saved').then(function(data) {
		$.get('/savedArticles').then(function(savedArticleData) {
			for (i = 0; i < savedArticleData.length; i++) {
				
				$('#savedArticleContainer').append(
					"<div class='well'>"
	                	+ "<a href='" + savedArticleData[i].url + "'>" + savedArticleData[i].headline + "</a>"
	                	+ "<button class='btn btn-danger deleteArticleBtn pull-right' data-id='" + savedArticleData[i]._id + "' style='padding: 5px; margin-left:15px;'>Delete From Saved</button>"
	                	+ "<button class='btn btn-info articleNoteBtn pull-right' data-id='" + savedArticleData[i]._id + "' style='padding: 5px;'>Add Notes</button>"
	            	+ "</div>"
	            );
			}			
		})

	});

	$('#savedArticleContainer').on('click', '.deleteArticleBtn', function(data) {
		var articleIdToDelete = {id: $(this).attr('data-id')}

		$.ajax({
		    url: '/deleteSaved',
		    type: 'DELETE',
		    data: articleIdToDelete,
		    success: function(result) {
		        window.location.replace('/saved');
		    }
		});
	});

	$('#savedArticleContainer').on('click', '.articleNoteBtn', function(data) {
		var articleNoteUserInput = {id: $(this).attr('data-id')};

		console.log(articleNoteUserInput)

		$.ajax({
			url: '/getNotesById',
			type: 'GET',
			data: articleNoteUserInput,
			success: function(data) {
				console.log('server response', data)
			}
		});

		$('#noteModal').modal('show');	

		$('.submitArticleNoteUserInput').on('click', function() {			

			$('#noteModal').modal('hide');

			articleNoteUserInput.noteValue = $('.articleNoteUserInput').val().trim();

			$.ajax({
				url: '/addArticleNote',
				type: 'PUT',
				data: articleNoteUserInput,
				success: function(data) {
					if (data.notes === articleNoteUserInput.noteValue) {
						$('.modal-title').html('<h4>Note Added!</h4>');
						$('.modal-body').html('');	
						$('#noteModal').modal('show');			
					}
				}
			});
		});
	});

//<input class="btn btn-danger removeCurrentNote" type='submit' value="Remove" style='margin-left:15px'>