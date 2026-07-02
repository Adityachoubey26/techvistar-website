import re
with open('frontend/src/data/services.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's inspect the first service object block
m = re.search(r"export const SERVICES:.*?=\s*\[\s*\{(.*?)\}\s*,", content, re.DOTALL)
if m:
    print(m.group(1))
else:
    print("Not found")
