const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function parseFAQs(fileContent, regexArray) {
    let allFaqs = [];
    for (let regex of regexArray) {
        let match;
        while ((match = regex.exec(fileContent)) !== null) {
            allFaqs.push({ q: match[1], a: match[2] });
        }
    }
    return allFaqs;
}

const workContent = fs.readFileSync(path.join(srcDir, 'pages', 'Work.tsx'), 'utf8');
const workFaqs = parseFAQs(workContent, [
    /\{ q:\s*['"`](.*?)['"`],\s*a:\s*['"`](.*?)['"`]\s*\}/g
]);

const servicesContent = fs.readFileSync(path.join(srcDir, 'data', 'services.ts'), 'utf8');
const servicesFaqs = [];
const serviceMatches = servicesContent.match(/faqs:\s*\[([\s\S]*?)\]/g);
if (serviceMatches) {
    serviceMatches.forEach(m => {
        const faqs = parseFAQs(m, [
            /\{\s*question:\s*['"`](.*?)['"`],\s*answer:\s*['"`](.*?)['"`]\s*\}/g
        ]);
        servicesFaqs.push(...faqs);
    });
}

const solutionsContent = fs.readFileSync(path.join(srcDir, 'data', 'solutions.ts'), 'utf8');
const solutionsFaqs = [];
const solutionMatches = solutionsContent.match(/faqs:\s*\[([\s\S]*?)\]/g);
if (solutionMatches) {
    solutionMatches.forEach(m => {
        const faqs = parseFAQs(m, [
            /\{\s*q:\s*['"`](.*?)['"`],\s*a:\s*['"`](.*?)['"`]\s*\}/g
        ]);
        solutionsFaqs.push(...faqs);
    });
}

const careersFile = path.join(srcDir, 'data', 'careers.ts');
const careersFaqs = [];
if (fs.existsSync(careersFile)) {
    const careersContent = fs.readFileSync(careersFile, 'utf8');
    const careersMatches = careersContent.match(/faqs:\s*\[([\s\S]*?)\]/g);
    if (careersMatches) {
        careersMatches.forEach(m => {
            const faqs = parseFAQs(m, [
                /\{\s*question:\s*['"`](.*?)['"`],\s*answer:\s*['"`](.*?)['"`]\s*\}/g
            ]);
            careersFaqs.push(...faqs);
        });
    }
}

console.log("Work FAQs:", workFaqs.length);
console.log("Services FAQs:", servicesFaqs.length);
console.log("Solutions FAQs:", solutionsFaqs.length);
console.log("Careers FAQs:", careersFaqs.length);

const allNewFaqs = [...workFaqs, ...servicesFaqs, ...solutionsFaqs, ...careersFaqs];
const uniqueFaqs = [];
const seenQ = new Set();
for (const f of allNewFaqs) {
    if (!seenQ.has(f.q)) {
        seenQ.add(f.q);
        uniqueFaqs.push(f);
    }
}

console.log("Total unique extra FAQs:", uniqueFaqs.length);

const faqsFile = path.join(srcDir, 'data', 'faqs.ts');
let faqsContent = fs.readFileSync(faqsFile, 'utf8');

let extraFaqsString = uniqueFaqs.map((f, i) => `  {
    id: 'extracted-faq-${i}',
    category: 'General',
    page: 'all',
    tags: [],
    featured: false,
    question: ${JSON.stringify(f.q)},
    answer: ${JSON.stringify(f.a)}
  }`).join(',\n');

faqsContent = faqsContent.replace(/];\s*$/, `, // appended\n${extraFaqsString}\n];\n`);
fs.writeFileSync(faqsFile, faqsContent);
console.log("Updated faqs.ts");
