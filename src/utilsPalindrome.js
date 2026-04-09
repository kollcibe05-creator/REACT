export default function isPalindrome(word) {
    if(/^[A-za-z]+$/.test(word) === false) {
        throw new Error("Invalid input")
    }
    for(let i = 0; i < (word.length)/2; i ++) {
        const j = word.length - 1 - i 
        if(word[i] !== word[j]) return false
    }
    return true
}
