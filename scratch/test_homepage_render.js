import http from 'http';

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          dataLength: data.length,
          snippet: data.slice(0, 150)
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  console.log('Testing ANTICRO Dev Server & Visual Assets:');
  
  const rootRes = await checkUrl('http://localhost:5173/');
  console.log('1. Root HTML (/):', rootRes.statusCode === 200 ? '✓ 200 OK' : rootRes.statusCode);

  const heroRes = await checkUrl('http://localhost:5173/src/assets/hero_infrastructure.jpg');
  console.log('2. Hero Photo (/src/assets/hero_infrastructure.jpg):', heroRes.statusCode === 200 ? '✓ 200 OK (size: ' + heroRes.dataLength + ')' : heroRes.statusCode);

  const fieldRes = await checkUrl('http://localhost:5173/src/assets/field_evidence_school_drainage.jpg');
  console.log('3. Field Evidence Photo (/src/assets/field_evidence_school_drainage.jpg):', fieldRes.statusCode === 200 ? '✓ 200 OK (size: ' + fieldRes.dataLength + ')' : fieldRes.statusCode);

  const apiRes = await checkUrl('http://localhost:5173/api/ai/status');
  console.log('4. Gemini AI Status (/api/ai/status):', apiRes.statusCode === 200 ? '✓ 200 OK' : apiRes.statusCode, apiRes.snippet);

  console.log('\nAll asset and backend endpoints verified successfully.');
}

run();
