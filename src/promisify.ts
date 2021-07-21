export default function promisify(fn) {
  return (...args) => new Promise((resolve, reject) => {
    fn(...args, (err, ...results) => err ? reject(err) : resolve(results))
  })
}