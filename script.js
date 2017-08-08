$(document).ready(function(){
  var ce_flag = true;
  var history = [];
  var operand = '';
  $('.calc-btn').click(function(){
    var btn_val = this.getAttribute('data-btn-type');
    if(btn_val == 'AC') {
      $('.calc-op').prop('disabled', false);
      $('.calc-op').css('backgroundColor', '#ff7f11');
      $('#answer').text('');
      operand = '';
      history = [];
    }
    else if(btn_val == 'CE') {
      var hist_len = history.length;
        if(!ce_flag) {
          $('.calc-op').prop('disabled', false);
          $('.calc-op').css('backgroundColor', '#ff7f11');
          history.pop();
          operand = history.pop().toString();
          $('#answer').text(operand);
        }
        else{
          $('.calc-op').prop('disabled', true);
          $('.calc-op').css('backgroundColor', 'black'); 
          operand = '';
          $('#answer').text(operand);
        } 
    }
    else if(btn_val == '+' || btn_val == '-' || btn_val == '/' || btn_val == '*') {
      ce_flag = false;
      if(operand != '') {
        history.push(parseFloat(operand));
        history.push(btn_val)
        $('#answer').text('');
        operand = '';
        $('.calc-op').prop('disabled', true);
        $('.calc-op').css('backgroundColor', 'black');
      }   
    }
    else if(btn_val == '=') {
      ce_flag = true;
      var op1;
      var op2;
      if(history.length >= 2) {
        history.push(parseFloat(operand));
        var answer = history[0];
        for(var i = 1; i<history.length; i += 2) {
          op1 = answer;
          var operator = history[i];
          if(i+1 <=history.length) {
            op2 = history[i+1];  
          }
          else {
            op2 = 0;
          }     
          switch(operator) {
            case '+':
              answer = op1 + op2;
              break;
            case '-':
              answer = op1 - op2;
              break;
            case '/':
              answer = op1 / op2;
              break;
            case '*':
              answer = op1 * op2;
              break;
            default:
              break;
          }          
        } 
        if (answer.toString().length < 9){
          $('#answer').text(answer);
          operand = answer.toString();
          history = [];
          answer = 0;
        }
        else {
          alert('answer too big');
          $('#answer').text('');
          history = [];
          operand = '';
        }        
      }       
    }
    else {
      ce_flag = true;
      $('.calc-op').prop('disabled', false);
      $('.calc-op').css('backgroundColor', '#ff7f11');
      if(operand.length <= 8) {
        $('#answer').append(this.getAttribute('data-btn-type')); 
        operand += this.getAttribute('data-btn-type');
      }
      else {
        alert('number too large');
        $('#answer').text('');
        operand = '';
      }  
    }
  });
});