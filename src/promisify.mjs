export default fn => (...args) => new Promise((resolve, reject) => {
  console.log(args)
  fn(...args, (err, ...rtn) => err ? reject(err) : resolve(rtn))
})