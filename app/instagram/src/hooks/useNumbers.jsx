
const useNumbers=(x)=>{
    if (x>0 && x<1000) return `${x}`
    else if (x>=1000 && x<999999) return `${(x/1000)}K`
    else if (x>=1000000) return `${(x / 1000000).toFixed(1)}M`
}

export default useNumbers