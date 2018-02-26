let tableData = [
    ["421", "126", "678"], ["37", "456", "7890"], ["2890", "7890", "cvn567"], ["1xgn", "xfgn", "xnf"]
];
let tableHeads = ["colHead-1", "colHead-2", "colHead-3"];
let wrapper = "body";
//*****************************

let settings = {
    tableData: tableData,
    tableCols: tableHeads,
    tableWrap: wrapper
};

class CellHead {
    constructor(colNum) {
        this.colNum = colNum;
        this.node = document.createElement("th");
        this.data = settings.tableCols[colNum];
        this.node.dataset.colNum = colNum;
        this.node.innerHTML = this.data;
    }
}

class Cell {
    constructor(rowNum, colNum) {
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.node = document.createElement("td");
        this.data = settings.tableData[rowNum][colNum];
        this.node.dataset.rowNum = rowNum;
        this.node.dataset.colNum = colNum;
        this.node.innerHTML = this.data;
    }
}

class NewCell {
    constructor(lastRow, colNum, dataSource) {
        this.rowNum = lastRow;
        this.colNum = colNum;
        this.node = document.createElement("td");
        this.data = dataSource[colNum];
        this.node.dataset.rowNum = lastRow;
        this.node.dataset.colNum = colNum;
        this.node.innerHTML = this.data;
    }
}

class Row {
    constructor(rowNum) {
        this.node = document.createElement("tr");
        this.arrCells = [];
        this.rowNum = rowNum;
    }
}


class Table {
    constructor(settings) {
        this.node = document.createElement("table");
        this.arrRows = [];

        let headerRowThead = document.createElement("thead");
        let headerRow = document.createElement("tr");
        for (let colNum = 0; colNum < settings.tableCols.length; colNum++) {
            let cellHead = new CellHead(colNum);
            headerRow.appendChild(cellHead.node);
        }
        headerRowThead.appendChild(headerRow);
        this.node.appendChild(headerRowThead);

        let tbody = document.createElement("tbody");
        for (let rowNum = 0; rowNum < settings.tableData.length; rowNum++) {
            let row = new Row(rowNum);
            for (let colNum = 0; colNum < settings.tableCols.length; colNum++) {
                let cell = new Cell(rowNum, colNum);
                row.arrCells.push(cell);
                row.node.appendChild(cell.node);
            }
            tbody.appendChild(row.node);
            this.arrRows.push(row);
        }
        this.node.appendChild(tbody);


        document.querySelector(settings.tableWrap).appendChild(this.node);


    }

    sort(colNum) {
        function sortTable(row1, row2) {
            if (row1.arrCells[colNum].data < row2.arrCells[colNum].data) {
                return -1;
            } else {
                return 1;
            }
        }

        this.arrRows.sort(sortTable);
        let tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        this.arrRows.forEach(function (elem) {
            tbody.appendChild(elem.node);
        });
    }

    removeRow(rowNum) {
        let i;
        this.arrRows.forEach(function (el, index) {
            if (el.rowNum === rowNum) {
                i = index;
            }
        });
        this.arrRows.splice(i, 1);
    }

    addNewRow(newRowData) {
        let sortRow = document.querySelector(".active-sort");
        let row = new Row(this.arrRows.length);
        for (let colNum = 0; colNum < tableHeads.length; colNum++) {
            let cell = new NewCell(this.arrRows.length, colNum, newRowData);
            row.node.appendChild(cell.node);
            row.arrCells.push(cell);

        }
        this.arrRows.push(row);
        document.querySelector("tbody").appendChild(row.node);
        if (sortRow) {
            let sortColNum = sortRow.getAttribute("data-col-num");
            this.sort(sortColNum);
        }
    }

}

let table = new Table(settings);


document.querySelectorAll("th").forEach(function (elem) {
    elem.addEventListener("click", function () {
        document.querySelectorAll("th").forEach(function (elem) {
            if (elem.classList.contains("active-sort")) {
                elem.classList.remove("active-sort");
            }
        });
        this.classList.add("active-sort");
        table.sort(this.getAttribute("data-col-num"));
    });
});
document.querySelector("tbody").addEventListener("click", function (e) {
    if (e.target.tagName === "TD") {
        let rowNum = Number(e.target.getAttribute("data-row-num"));
        e.target.parentElement.remove();
        table.removeRow(rowNum);
    }
});

// *******************

let newRow = ["12546", "12546", "12546", "12546"];

table.addNewRow(newRow);



