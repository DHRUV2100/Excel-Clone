let sheetsData = {
  "Sheet1": []
};//sheet number{:rowId{colId:{}}}
let defaultPropsOnCell = {
  "text": "",
  "font-weight": "",
  "font-style": "",
  "text-decoration": "",
  "text-align": "left",
  "background-color": "white",
  "color": "black",
  "font-family": "noto Sans",
  "font-size": "14px"
};
let selectedSheet = "Sheet1";


$(document).ready(function () {
  let cellcontainer = $(".input-cell-container");
  console.log("Json");
  for (i = 1; i < 100; i++) {
    let ans = "";

    let n = i;

    while (n > 0) {
      let rem = n % 26;

      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }

    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
    $(".column-name-container").append(column);
    let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
    $(".row-name-container").append(row);

  }

  for (i = 1; i < 100; i++) {
    let row = $(`<div class="row-cell"></div>`);
    for (j = 1; j < 100; j++) {
      let column = $(`<div class="input-cell" id="rowId-${i}-colId-${j}" contenteditable="false"></div>`);
      row.append(column);
    }
    $(".input-cell-container").append(row);
  }

  function updateElement(attribute, val) {
    $(".input-cell.selected").each(function () {
      $(this).css(attribute, val);
      let [rowId, colId] = getRowCol(this);
      console.log(rowId + " " + colId);
      //checking if the row exists for this particular cell
      console.log(sheetsData[selectedSheet][rowId]);
      if (sheetsData[selectedSheet][rowId]) {
        //checking if coldId exists for that cell
        if (sheetsData[selectedSheet][rowId][colId]) {
          console.log("HaraamZaada 1");
          sheetsData[selectedSheet][rowId][colId][attribute] = val;
        }
        else {
          //colId doesnt exist
          //make one then
          console.log("HaraamZaada 2");
          sheetsData[selectedSheet][rowId][colId] = { ...defaultPropsOnCell };
          sheetsData[selectedSheet][rowId][colId][attribute] = val;
        }
      }
      else {
        //make an empty row
        console.log("HaraamZaada 3");
        sheetsData[selectedSheet][rowId] = {};
        //make a colId object(its so sure that we created a new row here which defintiely means that no colId on that row Id already existed )
        sheetsData[selectedSheet][rowId][colId] = { ...defaultPropsOnCell };
        sheetsData[selectedSheet][rowId][colId][attribute] = val;
      }
      //if colId's all properties matches with properties of default one
      if (JSON.stringify(sheetsData[selectedSheet][rowId][colId]) === JSON.stringify(defaultPropsOnCell)) {
        //delete this colId coxz we already decided that we ll delete any cell's data if it matches with the default one
        delete (sheetsData[selectedSheet][rowId][colId]);
        //checking if row didnt become empty
        if (sheetsData[selectedSheet][rowId].length == 0) {
          //delete this row
          delete (sheetsData[selectedSheet][rowId]);
        }
      }

    });
    console.log(sheetsData)

  }

  $(".align-icon").click(function () {
    $(".align-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });
  //yahin pe give allignment in cell as well
  $(".icon-align-left").click(function () {
    updateElement("text-align", "left");
  });
  $(".icon-align-center").click(function () {
    updateElement("text-align", "center");
  });
  $(".icon-align-right").click(function () {
    updateElement("text-align", "right");
  });

  $(".style-icon").click(function () {
    $(this).toggleClass("selected");
    console.log($(this).attr("class"));
  });

  $(".input-cell").click(function (e) {
    if (e.ctrlKey) {
      let [rowId, colId] = getRowCol(this);
      if (rowId >= 1) {
        let topCellSelected = $(`#rowId-${rowId - 1}-colId-${colId}`);
        console.log($(topCellSelected).attr("class"));
        if (topCellSelected.hasClass("selected") == true) {
          console.log("i miss you")
          $(this).addClass("top-cell-selected");
          $(`#rowId-${rowId - 1}-colId-${colId}`).addClass("bottom-cell-selected");
        }
      }

      if (rowId <= 100) {
        let bottomCellSelected = $(`#rowId-${rowId + 1}-colId-${colId}`).hasClass("selected");
        if (bottomCellSelected) {
          $(this).addClass("bottom-cell-selected");
          $(`#rowId-${rowId + 1}-colId-${colId}`).addClass("top-cell-selected");
        }
      }

      if (colId >= 1) {
        let leftCellSelected = $(`#rowId-${rowId}-colId-${colId - 1}`).hasClass("selected");
        if (leftCellSelected) {
          $(this).addClass("left-cell-selected");
          $(`#rowId-${rowId}-colId-${colId - 1}`).addClass("right-cell-selected");
          console.log(this.attr);
          // console.log($(`#rowId-${rowId}-colId-${colId-1}`).attr);
        }
      }
      if (colId <= 100) {
        let rightCellSelected = $(`#rowId-${rowId}-colId-${colId + 1}`).hasClass("selected");
        if (rightCellSelected) {
          $(this).addClass("right-cell-selected");
          $(`#rowId-${rowId}-colId-${colId + 1}`).addClass("left-cell-selected");
          console.log(this.attr);
          // console.log($(`#rowId-${rowId}-colId-${colId+1}`).attr);
        }
      }
      $(this).addClass("selected");
    }

    else {
      $(".input-cell.selected").removeClass("selected top-cell-selected bottom-cell-selected right-cell-selected left-cell-selected");
      $(this).addClass("selected");
    }
    //update header of tools table acc to attributes set to data cell
    updateHeader(this);
  });

  function updateHeader(cell) {
    let [rowId, colId] = getRowCol(cell);//using destructuring
    let cellInfo = defaultPropsOnCell;
    if (sheetsData[selectedSheet][rowId] && sheetsData[selectedSheet][rowId][colId]) {
      cellInfo = sheetsData[selectedSheet][rowId][colId];//got the whole object of properties of an cell
    }
    //
    console.log($(cellInfo["font-weight"]));
    // if ($(cellInfo["font-weight"])) {//if font weight isn't empty
    //   console.log("joe");
    //   $(".icon-bold").addClass("selected");

    // }
    // else {
    //   $(".icon-bold").removeClass("selected");

    // }
    // if ($(cellInfo["font-style"])) {
    //   $(".icon-italic").addClass("selected");

    // }
    // else {
    //   $(".icon-italic").removeClass("selected");

    // }
    // if ($(cellInfo["text-decoration"])) {
    //   $(".icon-underline").addClass("selected");
    // }
    // else {
    //   $(".icon-underline").removeClass("selected");
    // }


    $(cellInfo["font-weight"]) ? $(".icon-bold").addClass("selected") : $(".icon-bold style-icon").removeClass("selected")
    $(cellInfo["font-style"]) ? $(".icon-italic").addClass("selected") : $(".icon-bold style-icon").removeClass("selected")
    $(cellInfo["text-decoration"]) ? $(".icon-underline").addClass("selected") : $(".icon-bold style-icon").removeClass("selected")
  }

  $(".input-cell").dblclick(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".input-cell-container").scroll(function () {
    $(".column-name-container").scrollLeft(this.scrollLeft);
    $(".row-name-container").scrollTop(this.scrollTop);
  });



  $(".icon-bold").click(function () {
    let isBoldSelected = $(this).hasClass("selected");
    console.log($(this).attr("class"));
    if (isBoldSelected == false) {
      //remove selected from bold
      // $(this).removeClass("selected");
      updateElement("font-weight", "");
    }
    else {
      updateElement("font-weight", "bold");
    }
  })
  $(".icon-italic").click(function () {
    let isItalicSelected = $(this).hasClass("selected");
    if (isItalicSelected == false) {
      //remove selected from bold
      // $(this).removeClass("selected");
      updateElement("font-style", "");
    }
    else {
      updateElement("font-style", "italic");
    }
  })
  $(".icon-underline").click(function () {
    let isUnderlineSelected = $(this).hasClass("selected");
    if (isUnderlineSelected == false) {
      //remove selected from bold
      // $(this).removeClass("selected");
      updateElement("text-decoration", "");
    }
    else {
      updateElement("text-decoration", "underline");
    }
  })

  //for select tag
  $(".Font-size-selector").change(function (e) {
    // let val=e.
    updateElement("font-size", e.target.value + "px");
  })

});

function getRowCol(ele) {
  let idArray = $(ele).attr("id").split("-");
  let rowId = parseInt(idArray[1]);
  let colId = parseInt(idArray[3]);
  return [rowId, colId];
}


