import team from './team';
import sliders from './sliders';
import menu from './menu';

team();
menu();
$('#countdown').countdown('2018/4/30', function(event) {
  $(this).html(event.strftime('%D d : %H h : %M m'));
});
const slidersInit = new sliders();
