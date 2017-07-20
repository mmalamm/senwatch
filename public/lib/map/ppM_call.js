$.ajax({
  url: './api/sens',
  beforeSend: function(xhr) {
       xhr.setRequestHeader("bovine", "corvus");
  },
  success: (data) => {
    var svg = d3.select("svg");
    svg.style('visibility', 'visible');
    window.senators = data;
    let mmm = Array.from($(".states")[0].children);
    mmm.forEach( state => {
      let sens = senators.filter(senator => senator.state === state.state_abbr);
      const partyColor = (sens) => {
        let repub = 0, dem = 0, othr = 0;
        sens.forEach(sen => {
          switch (sen.party) {
            case "R":
              repub++;
              break;
            case "D":
              dem++;
              break;
            default:
              othr++;
          }
        });
        switch ([repub,dem].toString()) {
          case '2,0':
            return '#B24C63';
          case '1,1':
            return '#6E28A3';
          case '0,2':
            return '#2B5CCE';
          default:
            return '#267543';
        }
      };
      state.color = partyColor(sens);
      state.style.transition = 'fill .5s ease';
      state.style.fill = state.color;
    });
  }
});
