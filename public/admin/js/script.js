// Button Status 
const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("button-status");

            //gắn url là ...?status=...
            // url.searchParams.set("status", status);
            if(status !=""){
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status");
            }

            //chuyển hướng theo url đó
            window.location.href = url.href;
        })
    });
}
// End Button Status  

// form Search  
const formSearch = document.querySelector("#form-search")

if(formSearch){
    formSearch.addEventListener("submit", (e)=>{

        let url = new URL(window.location.href);

        //ngăn ngừa hành vi mặc định, tránh load lại trang
        e.preventDefault();

        const value = e.target.elements.keyword.value;

        if(value !=""){
            url.searchParams.set("keyword", value);
        }else{
            url.searchParams.delete("keyword");
        }

        //chuyển hướng theo url đó
        window.location.href = url.href;
    }); 
}
// end form Search 

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]")
if(buttonPagination.length>0){
    let url = new URL(window.location.href);

    buttonPagination.forEach(button=>{
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-pagination");
               
            url.searchParams.set("page", page);

            //chuyển hướng theo url đó
            window.location.href = url.href;

        });
    });
}
//End Paginantion

// change status 

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("data-path");


if(buttonChangeStatus.length>0){
    buttonChangeStatus.forEach(button =>{
        button.addEventListener("click", ()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const statusChange = statusCurrent == "active"?"inactive":"active";
            
            const action = path +  `/${statusChange}/${id}?_method=PATCH`

            formChangeStatus.setAttribute("action", action);

            formChangeStatus.submit();
        })
    })

}

// end change status 
