document.addEventListener('DOMContentLoaded', function() {
    var stars = document.querySelectorAll('.stars li');
    var feedbackInput = document.getElementById('feedback-input');
    var sendButton = document.getElementById('send-button');
    var feedbackList = document.getElementById('feedback-list');
  
    stars.forEach(function(star) {
      star.addEventListener('click', function() {
        var value = this.getAttribute('data-value');
        clearSelectedStars();
        this.classList.add('selected');
      });
    });
  
    sendButton.addEventListener('click', function() {
      var rating = document.querySelector('.stars li.selected').getAttribute('data-value');
      var content = feedbackInput.value;
  
      if (content.trim() === '') {
        return;
      }
  
      var feedbackItem = createFeedbackItem(rating, content);
      feedbackList.appendChild(feedbackItem);
  
      feedbackInput.value = '';
      clearSelectedStars();
    });
  
    function createFeedbackItem(rating, content) {
      var item = document.createElement('div');
      item.classList.add('feedback-item');
  
      var ratingText = document.createElement('span');
      ratingText.classList.add('rating');
      ratingText.textContent = 'Đánh giá: ' + rating;
  
      var contentText = document.createElement('div');
      contentText.classList.add('content');
      contentText.textContent = content;
  
      var actions = document.createElement('div');
      actions.classList.add('actions');
  
      var editButton = document.createElement('button');
      editButton.textContent = 'Sửa';
      editButton.addEventListener('click', function() {
        var parent = this.parentNode.parentNode;
        var ratingValue = parent.querySelector('.rating').textContent.replace('Đánh giá: ', '');
        var feedbackContent = parent.querySelector('.content').textContent;
  
        var selectedStar = document.querySelector('.stars li[data-value="' + ratingValue + '"]');
        clearSelectedStars();
        selectedStar.classList.add('selected');
  
        feedbackInput.value = feedbackContent;
        sendButton.textContent = 'Update';
  
        sendButton.removeEventListener('click', sendButtonClickHandler);
        sendButton.addEventListener('click', updateButtonClickHandler.bind(null, parent));
  
        this.textContent = 'Lưu lại';
        this.removeEventListener('click', editButtonClickHandler);
        this.addEventListener('click', saveButtonClickHandler.bind(null, parent));
      });
  
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Xoá';
      deleteButton.addEventListener('click', function() {
        var parent = this.parentNode.parentNode;
        if (confirm('Bạn có chắc chắn muốn xoá bình luận này?')) {
          parent.remove();
        }
      });
  
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
  
      item.appendChild(ratingText);
      item.appendChild(contentText);
      item.appendChild(actions);
  
      return item;
    }
  
    function clearSelectedStars() {
      stars.forEach(function(star) {
        star.classList.remove('selected');
      });
    }
  
    function sendButtonClickHandler() {
      var rating = document.querySelector('.stars li.selected').getAttribute('data-value');
      var content = feedbackInput.value;
  
      if (content.trim() === '') {
        return;
      }
  
      var feedbackItem = createFeedbackItem(rating, content);
      feedbackList.appendChild(feedbackItem);
  
      feedbackInput.value = '';
      clearSelectedStars();
    }
  
    function updateButtonClickHandler(parent) {
      var rating = document.querySelector('.stars li.selected').getAttribute('data-value');
      var content = feedbackInput.value;
  
      if (content.trim() === '') {
        return;
      }
  
      parent.querySelector('.rating').textContent = 'Đánh giá: ' + rating;
      parent.querySelector('.content').textContent = content;
  
      feedbackInput.value = '';
      clearSelectedStars();
  
      sendButton.textContent = 'Send';
      sendButton.removeEventListener('click', updateButtonClickHandler);
      sendButton.addEventListener('click', sendButtonClickHandler);
  
      var editButton = parent.querySelector('.actions button:first-child');
      editButton.textContent = 'Sửa';
      editButton.removeEventListener('click', saveButtonClickHandler);
      editButton.addEventListener('click', editButtonClickHandler.bind(null, parent));
    }
  
    function saveButtonClickHandler(parent) {
      var rating = document.querySelector('.stars li.selected').getAttribute('data-value');
      var content = feedbackInput.value;
  
      if (content.trim() === '') {
        return;
      }
  
      parent.querySelector('.rating').textContent = 'Đánh giá: ' + rating;
      parent.querySelector('.content').textContent = content;
  
      feedbackInput.value = '';
      clearSelectedStars();
  
      sendButton.textContent = 'Send';
      sendButton.removeEventListener('click', updateButtonClickHandler);
      sendButton.addEventListener('click', sendButtonClickHandler);
  
      this.textContent = 'Sửa';
      this.removeEventListener('click', saveButtonClickHandler);
      this.addEventListener('click', editButtonClickHandler.bind(null, parent));
    }
  });