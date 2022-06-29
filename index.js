//algo for column names
// let n = 1200;
// let str = "";
// while (n > 0) {
//     let rem = n % 26;
//     if (rem == 0) {
//         str = 'Z' + str;
//         n = Math.floor(n / 26) - 1;//26 should get n as 0 because we have completed a series  
//     }
//     else {
//         let char = String.fromCharCode(rem - 1 + 65);//used for getting ASCII values from given integer value of ASCII code
//         str = char + str;
//         n=Math.floor(n/26);
//     }
// }
// console.log(str);

//JQuery
$(document).ready(function () {
    // console.log("HELLO");

    for (let i = 1; i < 100; i++) {
        let str = "";
        n = i;
        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                str = 'Z' + str;
                n = Math.floor(n / 26) - 1;//26 should get n as 0 because we have completed a series  
            }
            else {
                let char = String.fromCharCode(rem - 1 + 65);//used for getting ASCII values from given integer value of ASCII code
                str = char + str;
                n = Math.floor(n / 26);
            }
        }
        let col = $(`<div class="columnName colId-${i}" id="colCode-${str}">${str}</div>`);
        $(".columnNameContainer").append(col);
        // console.log(col);

        let row = $(`<div class="rowName"id="rowId-${i}">${i}</div>`);
        $(".rowNameContainer").append(row);
    }
    //filling matrix for input cells
    for (let i = 1; i < 100; i++) {
        let row = $(`<div class="cellRow"></div>`);
        for (let j = 1; j < 100; j++) {
            //make a cell
            let col = $(`<div class="inputCell" id="rowId-${i}-colId-${j}" contenteditable="false"></div>`);
            row.append(col);
        }
        $(".inputCellsContainer").append(row);
    }
    // }
    //event listener to text Style Icons
    $(".fontStyleIcon").click(function () {
        $(this).toggleClass("selected");
        //this is the one element in the all fontStyleIcon elements which is clicked
    });
    //event listener on align Icons
    $(".alignIcon").click(function () {
        //basically removing the already selected element in alignIcon
        $(".alignIcon.selected").removeClass("selected");
        //add class to clicked element
        //    $(this).addClass("selected");
    });
    //making a cell selected and removing the prev one
    $(".inputCell").click(function (e) {
        // console.log(e);
        if (e.ctrlKey == true) {
            let cellPosition = getCellRowCol(this);
            // $(this).addClass("selected");
            let rowId = cellPosition[0];
            let colId = cellPosition[1];
            console.log(rowId+ " "  +colId);
            if (rowId >=1) {
                // console.log("JI");
                let topCell = $(`#rowId-${rowId-1}-colId-${colId}`);
                // console.log($(topCell));
                if ($(topCell).hasClass("selected")) {
                    // console.log("VEER JI");
                    $(this).addClass("top-cell-selected");
                    $(topCell).addClass("bottom-cell-selected");
                }
                
                $(this).addClass("selected");
            }
            if (rowId <=100) {
                // console.log("JI");
                let bottomCell = $(`#rowId-${rowId+1}-colId-${colId}`);
                // console.log($(topCell));
                if ($(bottomCell).hasClass("selected")) {
                    console.log("VEER JI");
                    $(this).addClass("bottom-cell-selected");
                    $(bottomCell).addClass("top-cell-selected");
                    $(this).addClass("selected");
                }
            }
            if (colId >=1) {
                // console.log("JI");
                let leftCell = $(`#rowId-${rowId}-colId-${colId-1}`);
                // console.log($(topCell));
                if ($(leftCell).hasClass("selected")) {
                    // console.log("VEER JI");
                    $(this).addClass("left-cell-selected");
                    $(leftCell).addClass("right-cell-selected");
                }
            }
            if (colId <=100) {
                console.log("JI");
                let rightCell = $(`#rowId-${rowId}-colId-${colId+1}`);
                // console.log($(topCell));
                if ($(rightCell).hasClass("selected")) {
                    console.log("VEER JI");
                    $(this).addClass("right-cell-selected");
                    $(rightCell).addClass("left-cell-selected");
                }
            }
        }
        else {
            //remove from prev one
            $(".inputCell.selected").removeClass("selected");
            //add class to current one
            $(this).addClass("selected");
        }
    });
    //now we need to apply dblclick funcionality to cells
    $(".inputCell").dblclick(function () {
        //make already selected cells unselected
        $(".inputCell.selected").removeClass("selected");
        //select thec current clicked cell
        $(this).addClass("selected");
        //make the cell editable
        $(this).attr("contenteditable", "true");
        //making the cell focussed
        $(this).focus();
    });

    $(".inputCellsContainer").scroll(function () {
        // console.log("Triggered!");
        let leftVal = this.scrollLeft;
        // $("columnNameContainer").scrollLeft(this.scrollLeft);
        let col = document.querySelector('.columnNameContainer')
        // col.style.left = leftVal+'px'
        // $("rowNameContainer").scrollTop(this.scrollTop);
    })

})

function getCellRowCol(elem) {
    let arr = $(elem).attr("id").split('-');
    let rowId = parseInt(arr[1]);
    let colId = parseInt(arr[3]);
    return [rowId, colId];

}