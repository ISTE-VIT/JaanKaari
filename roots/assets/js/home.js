
 const numbersdata='https://api.covid19india.org/data.json';
async function  getdata(){

    const response= await fetch(numbersdata);
     const json =await response.json();
     const {statewise,cases_time_series}=json;
    console.log(cases_time_series)



    var col = [];
        for (var i = 0; i < statewise.length; i++) {
            delete statewise[i]._id
            delete statewise[i].deltaconfirmed
            delete statewise[i].deltadeaths
            delete statewise[i].deltarecovered
            delete statewise[i].lastupdatedtime
            delete statewise[i].migrated
            delete statewise[i].statecode
            delete statewise[i].statenotes
            delete statewise[i].migratedother

            for (var key in statewise[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[4];
        tr.appendChild(th);

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[1];
        tr.appendChild(th);

        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[0];
        tr.appendChild(th);

        for (var i = 2; i <col.length-1 ; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS from begining to 10
        for (var i = 1; i < 10; i++) {

            tr = table.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[4]];


            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[1]];


            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[0]];

            for (var j = 2; j < col.length-1; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = statewise[i][col[j]];
            }
        }

        //table for 11 to last
        for (var i = 11; i < statewise.length; i++) {

            tr = table.insertRow(-1);
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[4]];


            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[1]];


            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = statewise[i][col[0]];

            for (var j = 2; j < col.length-1; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = statewise[i][col[j]];
            }
        }



        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        var datelabels=[];
        var total_confirmed=[];
        var total_recovered=[];
        var total_deceased=[];
        const l = cases_time_series.length;
        for(var i=l-60;i<l;i++)
        {
          datelabels.push(cases_time_series[i].date);
          total_confirmed.push(cases_time_series[i].totalconfirmed);
          total_recovered.push(cases_time_series[i].totalrecovered);
          total_deceased.push(cases_time_series[i].totaldeceased);
        }


        //Graph starts here============================
        var ctx = document.getElementById('confirmed_chart').getContext('2d');
        var confirmed_chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: datelabels,
                    datasets: [{
                      label:'total confirmed',
                      data: total_confirmed,
                      backgroundColor:'transparent',
                      borderColor:'#00a8cc',
                      borderWidth: 5,
                    }],
                  }
      });

      var ctx = document.getElementById('recovered_chart').getContext('2d');
      var recovered_chart = new Chart(ctx, {
          type: 'line',
          data: {
                  labels: datelabels,
                  datasets: [{
                    label:'total recovered',
                    data: total_recovered,
                    backgroundColor:'transparent',
                    borderColor:'#21bf73',
                    borderWidth: 5,
                  }],
                }
    });

    var ctx = document.getElementById('deceased_chart').getContext('2d');
    var deceased_chart = new Chart(ctx, {
        type: 'line',
        data: {
                labels: datelabels,
                datasets: [{
                  label:'total deceased',
                  data: total_deceased,
                  backgroundColor:'transparent',
                  borderColor:'#ff3434',
                  borderWidth: 5,
                }],
              },

  });
  confirmed_chart.options.scales.yAxes[0].ticks.fontSize = 25 ;
  confirmed_chart.options.scales.xAxes[0].ticks.fontSize = 25 ;
  confirmed_chart.options.legend.labels.fontSize = 25;
  confirmed_chart.update();

  deceased_chart.options.scales.yAxes[0].ticks.fontSize = 25 ;
  deceased_chart.options.scales.xAxes[0].ticks.fontSize = 25 ;
  deceased_chart.options.legend.labels.fontSize = 25;
  deceased_chart.update();

  recovered_chart.options.scales.yAxes[0].ticks.fontSize = 25 ;
  recovered_chart.options.scales.xAxes[0].ticks.fontSize = 25 ;
  recovered_chart.options.legend.labels.fontSize = 25;
  recovered_chart.update();




};
getdata();

$('.carousel').carousel({
  interval: false,
});
// async function news(){
//   const response= await fetch(newsurl);
//    const news =await response.json();
//    const articles= news.articles;
//
//    console.log(articles[0].title);
// }
//
// news();
