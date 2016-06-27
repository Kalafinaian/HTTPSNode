var xlsx = require("node-xlsx");


var excelObj  = xlsx.parse("develop.xlsx");


console.log(excelObj );

//[ { name: 'Sheet1', data: [ [Object] ] } ]


for (var sheet in excelObj)
{
      var sheetData = excelObj[sheet].data; 
      var rowCount = sheetData.length;

      for (var i = 0; i < rowCount; i++) 
      {
          var rowData = sheetData[i]; 
          var columnCount = rowData.length;
          for (var j = 0; j < columnCount; j++) 
          {
              var cellData = rowData[j].toString();
              console.log(cellData);
          }
      }
}