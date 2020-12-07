let area_container = document.querySelector('.current-area-line');
let current_area = document.querySelectorAll('.current-area');
let current_area_title = document.querySelectorAll('.current-area-title');

current_area.forEach((i) => {
  i.addEventListener('click', function () {
    area_container
      .querySelector('.active-area')
      .classList.remove('active-area');

    i.classList.add('active-area');
  });
});
