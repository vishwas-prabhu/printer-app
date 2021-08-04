importScripts('./ngsw-worker.js')

self.addEventListener('sync', event => {
  if (event.tag === 'post-data') {
    event.waitUntil(addData())
  }
})

function addData() {
  console.log('hai')
  return Promise.reject(false)
}
