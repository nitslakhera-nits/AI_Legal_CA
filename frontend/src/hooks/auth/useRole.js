const useRole = () =>{
    const userRole = localStorage.getItem("userRole");

    return userRole?.trim().toLowerCase();
};

export default useRole;