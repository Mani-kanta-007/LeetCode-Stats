document.addEventListener("DOMContentLoaded",function(){
    const searchbtn = document.getElementById("search-btn");
    const userNametextBox = document.getElementById("input-username-search");
    const easyCircle = document.getElementById("easyCircle");
    const mediumCircle = document.getElementById("mediumCircle");
    const hardCircle = document.getElementById("hardCircle");
    const easyPara = document.getElementById('easyPara');
    const mediumPara = document.getElementById('mediumPara');
    const hardPara = document.getElementById('hardPara');


    function isValidUserName(usernamename) {
        if(usernamename.trim().length === 0) {
            alert("Type Something re baba!!");
            return false;
        }
        const regex = /^[a-zA-Z0-9_.-]{3,10}$/;
        const isMatch = regex.test(usernamename) ;
        if(isMatch) {
            return true ;
        }
        alert("Invalid Name : ",usernamename) ;
        return false ;
    }

    async function fetchUserName(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}` ;
        searchbtn.textContent = 'Searching....' ;
        searchbtn.disable = true ;
        try{
            const respone = await fetch(url) ;
            if(!respone.ok) {
                throw new Error(`request failed ${respone.status}`);
            }
            const data = await respone.json();
            console.log("userdata : ",data);
            if(data.message === "user does not exist") {
                alert("User Not Exist") ;
                return false ;
            }
            DisplayUserData(data) ;

        }
        catch(error){
            console.log(error);
        }
        finally {
            searchbtn.disable = false ;
            searchbtn.textContent = 'Search' ;
        }
    }

    function DisplayUserData(userdata) {

        const easyProblemSolvedCount = userdata.easySolved ;
        const totalEasyProblems = userdata.totalEasy ;
        const mediumProblemSolvedCount = userdata.mediumSolved ;
        const totalMediumProblems = userdata.totalMedium ;
        const hardProblemSolvedCount = userdata.hardSolved ;
        const totalHardProblems = userdata.totalHard ;
        
        updateCircle(easyProblemSolvedCount , totalEasyProblems , easyCircle , easyPara) ;
        updateCircle(mediumProblemSolvedCount , totalMediumProblems , mediumCircle , mediumPara) ;
        updateCircle(hardProblemSolvedCount , totalHardProblems , hardCircle , hardPara) ;



    }

    function updateCircle(solved , total , circle , label) {
        const colorPercentage = (solved/total) * 100 ;
        circle.style.setProperty("--progress-deg" , `${colorPercentage}%`);
        label.textContent = `${solved}/${total}` ;
    }


    searchbtn.addEventListener('click',function(){
        const username = userNametextBox.value;
        if(isValidUserName(username)) {
            console.log("username :",username);

            // now fetch the data of username
            fetchUserName(username) ;
        }
        
    })
})