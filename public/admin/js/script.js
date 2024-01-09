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

if(buttonChangeStatus.length>0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

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

// checkbox multi 
const checkboxMulti = document.querySelector("[checkbox-multi]");

if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']")

    
    inputCheckAll.addEventListener("click", ()=>{
        
        if(inputCheckAll.checked){
            inputsId.forEach(input => {
                input.checked = true;
            })
        }else{
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    })
    //kiểm tra số tích có bằng 4 không, nếu bằng thì nút ChéckAll được tích
    //còn không bằng 4 thì nút đó sẽ tự bỏ tích 
    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;

            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })

}
// end checkbox multi 


//form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");

if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{
        //ngăn chặn submit lên lập tức khi bấm vào 
        e.preventDefault();

        //lấy ra các ô đã check
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        
        //xem coi bạn có check vào nút delete all hay không
        const typeChange = e.target.elements.type.value;
        if(typeChange=="delete-all"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");
            
            if(!isConfirm){
                return;
            }
        }

        if(inputsChecked.length>0){
            //tạo ra một cái mảng để lưu trữ các id của các checkbox được tích vào
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input =>{
                const id = input.value
                

                if(typeChange== "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    // console.log(position)
                    ids.push(`${id}-${position}`);
                }else
                {
                     ids.push(id); 
                }
            })


            inputIds.value = ids.join(", ");

            
            formChangeMulti.submit();

        }else{
            alert("Vui lòng chọn ít nhất một bản ghi!");
        }

    })
}

//end form-change-multi

//delete item
const buttonDelete= document.querySelectorAll("[button-delete]");

if(buttonDelete.length>0){

    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach(button =>{
        button.addEventListener("click", ()=>{
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bản ghi này?");
            if(confirmDelete){
                const id = button.getAttribute("data-id");

                const action = path +  `/${id}?_method=DELETE`

                formDeleteItem.setAttribute("action", action);

                formDeleteItem.submit();
            }
            
        })
    })

}

// end delete item 


//show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time")) || 3000;
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    }, time);
    
    
    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden");
    })

}
// end show alert

//upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagPreview = uploadImage.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e)=>{
        if(e.target.files.length){
            const image = URL.createObjectURL(e.target.files[0]);

            uploadImagPreview.src = image;
        }
    })
}
//end upload image