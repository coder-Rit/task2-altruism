let reports;
let dataStatus = "pending";
const notiList = [
  {
    Name: "Ritesh patil",
    discript:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quidem!",
    timeStamp: Date.now() - 554000,
  },
  {
    Name: "Rushikesh K.",
    discript: "Lorem, ipsum dolor sit amet consectetur ",
    timeStamp: Date.now() - 5648613,
  },
  {
    Name: "Aarya Gundu",
    discript:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quidem, adipisicing elit. Provident, quidem!",
    timeStamp: Date.now() - 66876455,
  },
  {
    Name: "Rohit Kadam",
    discript: "consectetur adipisicing elit. Provident, quidem!",
    timeStamp: Date.now() - 160064564,
  },
];

let list = "";
let isToggel = true;
let isMenuToggle = false;
let notElemiList = "";

document.getElementById("list").innerHTML = `<div class="loader-container">
<div class="loader"></div>
</div><div class="loader-container">
<div class="loader"></div>
</div><div class="loader-container">
<div class="loader"></div>
</div><div class="loader-container">
<div class="loader"></div>
</div>`

axios
  .get("https://task2excel.onrender.com/api/v1/plant/all")
  .then((data) => {
    console.log(data.data.data);
    data.data.data.map((report) => {
      console.log(report.report.mainHeading);
      const elementObj = ` 
       <div class="nodeDiv">
      <span class="nodeTitle">${report.report.reportName}</span>
      <span class="reportId">${report._id}</span>
      
      <div class="relationDiv">
    <span>From Date</span>
    <span>${report.report.fromDate}</span>
    

</div>
      <div class="relationDiv gatterBottom">
    <span>To Date</span>
    <span>${report.report.toDate}</span>


</div>

<div class="moveItemLeft">
    
<a ></a>
<a href="https://task2excel.onrender.com/api/v1/getDummySheet/${report._id}" class="downloadBTN">Download   &nbsp <i class="fa-solid fa-file-arrow-down"></i></a>


</div>

 



      </div>  
      `;
      list = list + elementObj;
    });
    document.getElementById("list").innerHTML = list;
  })
  .catch((err) => {
    console.log(err);
    dataStatus = "error";
  });

//convert timestamp
const timeAgo = (timestamp) => {
  const now = new Date();
  const timestampDate = new Date(timestamp);
  const timeDifference = now - timestampDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days + "d ago";
  } else if (hours > 0) {
    return hours + "h ago";
  } else if (minutes > 0) {
    return minutes + "m ago";
  } else {
    return seconds + "s ago";
  }
};

//toggling of dropdown
const toggel = () => {
  
  if (isToggel) {
    document.getElementById("list").style.height = "0px";
    document.getElementById("fa-chevron-down").style.transform = "rotateZ(0deg)";
  } else {
    document.getElementById("fa-chevron-down").style.transform = "rotateZ(180deg)";
    if (window.innerWidth <= 750) {
      document.getElementById("list").style.height = "600px";
    } else {
      document.getElementById("list").style.height = "350px";
    }
  }
  isToggel = !isToggel;
};

//toggling of menu
const toggelMenu = () => {
  if (isMenuToggle) {
    document.getElementById("menu").style.transform = "translateX(0px)";
    document.getElementById(
      "bars"
    ).innerHTML = `<i class="fa-solid fa-xmark fa-lg" onclick="toggelMenu()"></i>`;
  } else {
    document.getElementById("menu").style.transform = "translateX(-200px)";
    document.getElementById(
      "bars"
    ).innerHTML = `<i class="fa-solid fa-bars fa-lg" onclick="toggelMenu()"></i>`;
  }
  isMenuToggle = !isMenuToggle;
};

//opeing of notificatino
const openNotification = () => {
  document.getElementById("noti").style.transform = "translateX(0px)";
};

//closing of notificatino
const closeNotification = () => {
  document.getElementById("noti").style.transform = "translateX(450px)";
};

// creating html

if (dataStatus === "success") {
  console.log(reports);
}

notiList.map((elme) => {
  notElemiList =
    notElemiList +
    ` <div class="notielm">
      <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=${
        elme.Name
      }" alt="">
      <div>
          <span>${elme.Name}</span>
          <span>${elme.discript}</span>
          <span>${timeAgo(elme.timeStamp)}</span>
  
      </div>
  </div>`;
});

//inintialzers
toggel();
toggelMenu();
//filling html elements

document.getElementById("notiList").innerHTML = notElemiList;
