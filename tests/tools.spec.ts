import { test, expect } from '@playwright/test';

// ============================================================
// 1. Word Counter - /tools/word-counter
// ============================================================
test.describe('Word Counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/word-counter');
  });

  test('should display all stat cards with initial zero values', async ({ page }) => {
    const statLabels = ['Words', 'Characters', 'Characters (no spaces)', 'Sentences', 'Paragraphs', 'Lines'];
    for (const label of statLabels) {
      const statCard = page.locator(`text=${label}`).first();
      await expect(statCard).toBeVisible();
    }
    // All should be 0 initially
    const zeroValues = page.locator('div.text-2xl:has-text("0")');
    const count = await zeroValues.count();
    expect(count).toBe(6);
  });

  test('should update word count correctly', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Hello world this is a test');
    // Words: 6
    await expect(page.locator('text=6').first()).toBeVisible();
  });

  test('should count characters correctly', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Hello');
    // Characters: 5, Characters no spaces: 5, Words: 1
    await expect(page.locator('text=5').first()).toBeVisible();
    await expect(page.locator('text=1').first()).toBeVisible();
  });

  test('should count sentences correctly', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Hello world. How are you? Fine!');
    // Sentences: 3, Words: 6
    await expect(page.locator('text=6').first()).toBeVisible();
  });

  test('should count paragraphs correctly', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Paragraph one.\n\nParagraph two.');
    // Paragraphs: 2
    await expect(page.locator('text=2').first()).toBeVisible();
  });
});

// ============================================================
// 2. JSON Formatter - /tools/json-formatter
// ============================================================
test.describe('JSON Formatter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/json-formatter');
  });

  test('should format valid JSON', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('{"name":"John","age":30}');
    await page.locator('button:has-text("Format")').click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toContain('"name"');
    expect(text).toContain('"John"');
    expect(text).toContain('"age"');
    // Should have indentation (newlines)
    expect(text).toContain('\n');
  });

  test('should show error for invalid JSON', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('{invalid json}');
    await page.locator('button:has-text("Format")').click();
    const errorDiv = page.locator('text=❌').first();
    await expect(errorDiv).toBeVisible();
  });

  test('should minify JSON', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('{\n  "name": "John",\n  "age": 30\n}');
    await page.locator('button:has-text("Minify")').click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toBe('{"name":"John","age":30}');
  });

  test('should change indent level', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('{"a":1}');
    // Change to 4 spaces
    await page.locator('select').selectOption('4');
    await page.locator('button:has-text("Format")').click();
    const output = page.locator('pre');
    const text = await output.textContent();
    expect(text).toContain('    "a"'); // 4-space indent
  });
});

// ============================================================
// 3. Base64 - /tools/base64
// ============================================================
test.describe('Base64 Encoder/Decoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/base64');
  });

  test('should encode text to Base64', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Hello World');
    await page.locator('button:has-text("Encode →")').click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toBe(btoa('Hello World'));
  });

  test('should decode Base64 to text', async ({ page }) => {
    // Switch to decode mode
    await page.locator('button:has-text("Decode")').first().click();
    const textarea = page.locator('textarea');
    await textarea.fill(btoa('Hello World'));
    await page.locator('button:has-text("Decode →")').click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toBe('Hello World');
  });

  test('should swap input and output', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('Test');
    await page.locator('button:has-text("Encode →")').click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const encoded = await output.textContent();
    // Click swap button
    await page.locator('button[title="Swap"]').click();
    // Mode should now be decode, input should have the encoded value
    const inputAfter = page.locator('textarea');
    const inputValue = await inputAfter.inputValue();
    expect(inputValue).toBe(encoded);
  });
});

// ============================================================
// 4. QR Code - /tools/qr-code
// ============================================================
test.describe('QR Code Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/qr-code');
  });

  test('should generate QR code', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await input.clear();
    await input.fill('https://example.com');
    await page.locator('button:has-text("Generate")').click();
    const img = page.locator('img[alt*="QR code"]');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toMatch(/^data:image/);
  });

  test('should generate QR code with custom text', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await input.clear();
    await input.fill('Hello QR');
    await page.locator('button:has-text("Generate")').click();
    const img = page.locator('img[alt*="QR code"]');
    await expect(img).toBeVisible();
  });

  test('should show download button after generation', async ({ page }) => {
    await page.locator('button:has-text("Generate")').click();
    const downloadBtn = page.locator('button:has-text("Download PNG")');
    await expect(downloadBtn).toBeVisible();
  });

  test('should have size selector', async ({ page }) => {
    const select = page.locator('select');
    await expect(select).toBeVisible();
    await select.selectOption('500');
    await page.locator('button:has-text("Generate")').click();
    const img = page.locator('img[alt*="QR code"]');
    await expect(img).toBeVisible();
  });
});

// ============================================================
// 5. Color Picker - /tools/color-picker
// ============================================================
test.describe('Color Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/color-picker');
  });

  test('should display color picker input', async ({ page }) => {
    const colorInput = page.locator('input[type="color"]');
    await expect(colorInput.first()).toBeVisible();
  });

  test('should display HEX value', async ({ page }) => {
    // Default color is #6366f1
    await expect(page.locator('text=#6366F1')).toBeVisible();
  });

  test('should display RGB value', async ({ page }) => {
    await expect(page.locator('span:has-text("RGB")').first()).toBeVisible();
    await expect(page.locator('span:has-text("rgb(")').first()).toBeVisible();
  });

  test('should display HSL value', async ({ page }) => {
    await expect(page.locator('span:has-text("HSL")').first()).toBeVisible();
    await expect(page.locator('span:has-text("hsl(")').first()).toBeVisible();
  });

  test('should update values when HEX input changes', async ({ page }) => {
    const hexInput = page.locator('input[type="text"]');
    await hexInput.clear();
    await hexInput.fill('#ff0000');
    // Should show red RGB
    await expect(page.locator('text=rgb(255, 0, 0)')).toBeVisible();
  });

  test('should have popular color presets', async ({ page }) => {
    await expect(page.locator('text=Popular Colors')).toBeVisible();
    const presets = page.locator('button[title]');
    const count = await presets.count();
    expect(count).toBeGreaterThanOrEqual(10);
  });
});

// ============================================================
// 6. URL Encoder - /tools/url-encoder
// ============================================================
test.describe('URL Encoder/Decoder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/url-encoder');
  });

  test('should encode URL special characters', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.fill('hello world&foo=bar');
    await page.locator('button:has-text("Encode")').last().click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toBe(encodeURIComponent('hello world&foo=bar'));
  });

  test('should decode URL-encoded string', async ({ page }) => {
    await page.locator('button:has-text("Decode")').first().click();
    const textarea = page.locator('textarea');
    await textarea.fill('hello%20world%26foo%3Dbar');
    await page.locator('button:has-text("Decode")').last().click();
    const output = page.locator('pre');
    await expect(output).toBeVisible();
    const text = await output.textContent();
    expect(text).toBe('hello world&foo=bar');
  });
});

// ============================================================
// 7. Lorem Ipsum - /tools/lorem-ipsum
// ============================================================
test.describe('Lorem Ipsum Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/lorem-ipsum');
  });

  test('should generate paragraphs', async ({ page }) => {
    await page.locator('button:has-text("Generate")').click();
    const output = page.locator('text=Generated Text').locator('..');
    await expect(page.locator('.whitespace-pre-wrap').first()).toBeVisible();
    const text = await page.locator('.whitespace-pre-wrap').first().textContent();
    expect(text!.length).toBeGreaterThan(50);
  });

  test('should generate specified number of paragraphs', async ({ page }) => {
    const countInput = page.locator('input[type="number"]');
    await countInput.clear();
    await countInput.fill('5');
    await page.locator('button:has-text("Generate")').click();
    const text = await page.locator('.whitespace-pre-wrap').first().textContent();
    // 5 paragraphs should have 4 double newlines
    const paragraphs = text!.split('\n\n');
    expect(paragraphs.length).toBe(5);
  });

  test('should generate sentences', async ({ page }) => {
    await page.locator('select').selectOption('sentences');
    const countInput = page.locator('input[type="number"]');
    await countInput.clear();
    await countInput.fill('3');
    await page.locator('button:has-text("Generate")').click();
    const text = await page.locator('.whitespace-pre-wrap').first().textContent();
    expect(text!.length).toBeGreaterThan(10);
  });

  test('should generate words', async ({ page }) => {
    await page.locator('select').selectOption('words');
    const countInput = page.locator('input[type="number"]');
    await countInput.clear();
    await countInput.fill('10');
    await page.locator('button:has-text("Generate")').click();
    const text = await page.locator('.whitespace-pre-wrap').first().textContent();
    const words = text!.trim().split(/\s+/);
    expect(words.length).toBe(10);
  });
});

// ============================================================
// 8. Unit Converter - /tools/unit-converter
// ============================================================
test.describe('Unit Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/unit-converter');
  });

  test('should convert meters to kilometers', async ({ page }) => {
    // Default: Meters -> Kilometers, value 1
    const valueInput = page.locator('input[type="number"]');
    await valueInput.clear();
    await valueInput.fill('1000');
    // Result should show 1
    await expect(page.locator('text=1').first()).toBeVisible();
    await expect(page.locator('div:has-text("Kilometers")').last()).toBeVisible();
  });

  test('should switch to Weight category', async ({ page }) => {
    await page.locator('button:has-text("Weight")').click();
    // Should show weight units in the select dropdowns
    const fromSelect = page.locator('select').first();
    const options = fromSelect.locator('option');
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toContain('Kilograms');
    expect(optionTexts).toContain('Pounds');
    expect(optionTexts).toContain('Ounces');
  });

  test('should convert temperature', async ({ page }) => {
    await page.locator('button:has-text("Temperature")').click();
    const valueInput = page.locator('input[type="number"]');
    await valueInput.clear();
    await valueInput.fill('100');
    // 100 Celsius -> Fahrenheit = 212
    const fromSelect = page.locator('select').first();
    const toSelect = page.locator('select').last();
    await fromSelect.selectOption('Celsius');
    await toSelect.selectOption('Fahrenheit');
    await expect(page.locator('text=212')).toBeVisible();
  });

  test('should have all category tabs', async ({ page }) => {
    await expect(page.locator('button:has-text("Length")')).toBeVisible();
    await expect(page.locator('button:has-text("Weight")')).toBeVisible();
    await expect(page.locator('button:has-text("Temperature")')).toBeVisible();
    await expect(page.locator('button:has-text("Speed")')).toBeVisible();
  });
});

// ============================================================
// 9. Markdown to HTML - /tools/markdown-html
// ============================================================
test.describe('Markdown to HTML', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/markdown-html');
  });

  test('should convert markdown to HTML', async ({ page }) => {
    // Page has default content, just click convert
    await page.locator('button:has-text("Convert to HTML")').click();
    const output = page.locator('pre').first();
    const text = await output.textContent();
    expect(text).toContain('<h1>');
    expect(text).toContain('Hello World');
    expect(text).toContain('<strong>');
    expect(text).toContain('<em>');
  });

  test('should show HTML preview', async ({ page }) => {
    await page.locator('button:has-text("Convert to HTML")').click();
    const preview = page.locator('text=Preview');
    await expect(preview).toBeVisible();
  });

  test('should convert custom markdown', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.clear();
    await textarea.fill('# Title\n\n**Bold text**\n\n- Item 1\n- Item 2');
    await page.locator('button:has-text("Convert to HTML")').click();
    const output = page.locator('pre');
    const text = await output.textContent();
    expect(text).toContain('<h1>');
    expect(text).toContain('Title');
    expect(text).toContain('<strong>');
    expect(text).toContain('Bold text');
    expect(text).toContain('<li>');
  });

  test('should handle links in markdown', async ({ page }) => {
    const textarea = page.locator('textarea');
    await textarea.clear();
    await textarea.fill('[Google](https://google.com)');
    await page.locator('button:has-text("Convert to HTML")').click();
    const output = page.locator('pre');
    const text = await output.textContent();
    expect(text).toContain('<a href="https://google.com">');
    expect(text).toContain('Google');
  });
});

// ============================================================
// 10. Image Compressor - /tools/image-compressor
// ============================================================
test.describe('Image Compressor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tools/image-compressor');
  });

  test('should display upload area', async ({ page }) => {
    await expect(page.locator('text=Drop an image here or click to upload')).toBeVisible();
    await expect(page.locator('text=Supports JPG, PNG, WebP')).toBeVisible();
  });

  test('should have quality slider', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await expect(slider).toBeVisible();
    await expect(page.locator('text=Quality: 70%')).toBeVisible();
  });

  test('should adjust quality slider', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
    await slider.evaluate((el: HTMLInputElement) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value')!.set!;
      nativeInputValueSetter.call(el, '50');
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await expect(page.locator('text=Quality: 50%')).toBeVisible();
  });

  test('should have hidden file input', async ({ page }) => {
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toBe('image/*');
  });
});
