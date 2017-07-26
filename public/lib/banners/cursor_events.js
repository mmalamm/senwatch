let tooltip = d3.select('body')
                .append('div')
                .style('position','absolute')
                .style('background','#002b55')
                .style('padding','5px 15px')
                .style('border','1px #999999 solid')
                .style('opacity','0')
                .style('border-radius', '5px')
                .style('transition', 'opacity 0.3s ease');

const cursorEvents = {
  personalInfoHover: (e) => {
    let zod = e.target.attributes.zod.value;
    let dob = e.target.attributes.dob.value;
    let hovText = `DOB: ${dob} (${zod})`;

    tooltip.transition().style('opacity',1);
    tooltip.html(hovText)
      .style('pointer-events', 'none')
      .style('left',(e.pageX - 30)+'px')
      .style('top',(e.pageY + 30)+'px');
  },
  personalInfoOff: (e) => {
    tooltip.transition().style('opacity',0);
  },
  openTab: (e) => {
    let btnID = e.target.attributes.id.value;
    let num = btnID[btnID.length - 1];
    let newTabID = `${btnID.slice(0, -5)}container-${num}`;
    let newTab = $(`#${newTabID}`);
    let oldTab = $(`.active-${num}`);
    let oldTabID = oldTab[0].id;

    oldTab[0].style.display = 'none';
    $(`#${oldTabID}`).removeClass(`active-${num}`);

    ///refactor into jquery
    let tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    ///

    newTab[0].style.display = 'block';
    $(`#${newTabID}`).addClass(`active-${num}`);
    e.currentTarget.className += ' active';
  }
};

export default cursorEvents;
