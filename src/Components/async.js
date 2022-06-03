async function main() {
  const results = await printOne()
      console.log(2)
      console.log(results)
}

main()

function printOne() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve("resolved")
    }, "1000")
  })
}