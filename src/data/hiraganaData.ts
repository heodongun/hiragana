export interface HiraganaChar {
  kana: string;
  romaji: string;
  type: 'basic' | 'dakuten' | 'combination';
  row: string;
  column: string;
  audioUrl?: string;
}

// Basic hiragana characters
export const basicHiragana: HiraganaChar[] = [
  // あ row
  { kana: 'あ', romaji: 'a', type: 'basic', row: 'a', column: 'a' },
  { kana: 'い', romaji: 'i', type: 'basic', row: 'a', column: 'i' },
  { kana: 'う', romaji: 'u', type: 'basic', row: 'a', column: 'u' },
  { kana: 'え', romaji: 'e', type: 'basic', row: 'a', column: 'e' },
  { kana: 'お', romaji: 'o', type: 'basic', row: 'a', column: 'o' },
  
  // か row
  { kana: 'か', romaji: 'ka', type: 'basic', row: 'k', column: 'a' },
  { kana: 'き', romaji: 'ki', type: 'basic', row: 'k', column: 'i' },
  { kana: 'く', romaji: 'ku', type: 'basic', row: 'k', column: 'u' },
  { kana: 'け', romaji: 'ke', type: 'basic', row: 'k', column: 'e' },
  { kana: 'こ', romaji: 'ko', type: 'basic', row: 'k', column: 'o' },
  
  // さ row
  { kana: 'さ', romaji: 'sa', type: 'basic', row: 's', column: 'a' },
  { kana: 'し', romaji: 'shi', type: 'basic', row: 's', column: 'i' },
  { kana: 'す', romaji: 'su', type: 'basic', row: 's', column: 'u' },
  { kana: 'せ', romaji: 'se', type: 'basic', row: 's', column: 'e' },
  { kana: 'そ', romaji: 'so', type: 'basic', row: 's', column: 'o' },
  
  // た row
  { kana: 'た', romaji: 'ta', type: 'basic', row: 't', column: 'a' },
  { kana: 'ち', romaji: 'chi', type: 'basic', row: 't', column: 'i' },
  { kana: 'つ', romaji: 'tsu', type: 'basic', row: 't', column: 'u' },
  { kana: 'て', romaji: 'te', type: 'basic', row: 't', column: 'e' },
  { kana: 'と', romaji: 'to', type: 'basic', row: 't', column: 'o' },
  
  // な row
  { kana: 'な', romaji: 'na', type: 'basic', row: 'n', column: 'a' },
  { kana: 'に', romaji: 'ni', type: 'basic', row: 'n', column: 'i' },
  { kana: 'ぬ', romaji: 'nu', type: 'basic', row: 'n', column: 'u' },
  { kana: 'ね', romaji: 'ne', type: 'basic', row: 'n', column: 'e' },
  { kana: 'の', romaji: 'no', type: 'basic', row: 'n', column: 'o' },
  
  // は row
  { kana: 'は', romaji: 'ha', type: 'basic', row: 'h', column: 'a' },
  { kana: 'ひ', romaji: 'hi', type: 'basic', row: 'h', column: 'i' },
  { kana: 'ふ', romaji: 'fu', type: 'basic', row: 'h', column: 'u' },
  { kana: 'へ', romaji: 'he', type: 'basic', row: 'h', column: 'e' },
  { kana: 'ほ', romaji: 'ho', type: 'basic', row: 'h', column: 'o' },
  
  // ま row
  { kana: 'ま', romaji: 'ma', type: 'basic', row: 'm', column: 'a' },
  { kana: 'み', romaji: 'mi', type: 'basic', row: 'm', column: 'i' },
  { kana: 'む', romaji: 'mu', type: 'basic', row: 'm', column: 'u' },
  { kana: 'め', romaji: 'me', type: 'basic', row: 'm', column: 'e' },
  { kana: 'も', romaji: 'mo', type: 'basic', row: 'm', column: 'o' },
  
  // や row
  { kana: 'や', romaji: 'ya', type: 'basic', row: 'y', column: 'a' },
  { kana: 'ゆ', romaji: 'yu', type: 'basic', row: 'y', column: 'u' },
  { kana: 'よ', romaji: 'yo', type: 'basic', row: 'y', column: 'o' },
  
  // ら row
  { kana: 'ら', romaji: 'ra', type: 'basic', row: 'r', column: 'a' },
  { kana: 'り', romaji: 'ri', type: 'basic', row: 'r', column: 'i' },
  { kana: 'る', romaji: 'ru', type: 'basic', row: 'r', column: 'u' },
  { kana: 'れ', romaji: 're', type: 'basic', row: 'r', column: 'e' },
  { kana: 'ろ', romaji: 'ro', type: 'basic', row: 'r', column: 'o' },
  
  // わ row
  { kana: 'わ', romaji: 'wa', type: 'basic', row: 'w', column: 'a' },
  { kana: 'を', romaji: 'wo', type: 'basic', row: 'w', column: 'o' },
  
  // ん
  { kana: 'ん', romaji: 'n', type: 'basic', row: 'n', column: 'n' },
];

// Dakuten and handakuten hiragana
export const dakutenHiragana: HiraganaChar[] = [
  // が row (dakuten か row)
  { kana: 'が', romaji: 'ga', type: 'dakuten', row: 'g', column: 'a' },
  { kana: 'ぎ', romaji: 'gi', type: 'dakuten', row: 'g', column: 'i' },
  { kana: 'ぐ', romaji: 'gu', type: 'dakuten', row: 'g', column: 'u' },
  { kana: 'げ', romaji: 'ge', type: 'dakuten', row: 'g', column: 'e' },
  { kana: 'ご', romaji: 'go', type: 'dakuten', row: 'g', column: 'o' },
  
  // ざ row (dakuten さ row)
  { kana: 'ざ', romaji: 'za', type: 'dakuten', row: 'z', column: 'a' },
  { kana: 'じ', romaji: 'ji', type: 'dakuten', row: 'z', column: 'i' },
  { kana: 'ず', romaji: 'zu', type: 'dakuten', row: 'z', column: 'u' },
  { kana: 'ぜ', romaji: 'ze', type: 'dakuten', row: 'z', column: 'e' },
  { kana: 'ぞ', romaji: 'zo', type: 'dakuten', row: 'z', column: 'o' },
  
  // だ row (dakuten た row)
  { kana: 'だ', romaji: 'da', type: 'dakuten', row: 'd', column: 'a' },
  { kana: 'ぢ', romaji: 'ji', type: 'dakuten', row: 'd', column: 'i' },
  { kana: 'づ', romaji: 'zu', type: 'dakuten', row: 'd', column: 'u' },
  { kana: 'で', romaji: 'de', type: 'dakuten', row: 'd', column: 'e' },
  { kana: 'ど', romaji: 'do', type: 'dakuten', row: 'd', column: 'o' },
  
  // ば row (dakuten は row)
  { kana: 'ば', romaji: 'ba', type: 'dakuten', row: 'b', column: 'a' },
  { kana: 'び', romaji: 'bi', type: 'dakuten', row: 'b', column: 'i' },
  { kana: 'ぶ', romaji: 'bu', type: 'dakuten', row: 'b', column: 'u' },
  { kana: 'べ', romaji: 'be', type: 'dakuten', row: 'b', column: 'e' },
  { kana: 'ぼ', romaji: 'bo', type: 'dakuten', row: 'b', column: 'o' },
  
  // ぱ row (handakuten は row)
  { kana: 'ぱ', romaji: 'pa', type: 'dakuten', row: 'p', column: 'a' },
  { kana: 'ぴ', romaji: 'pi', type: 'dakuten', row: 'p', column: 'i' },
  { kana: 'ぷ', romaji: 'pu', type: 'dakuten', row: 'p', column: 'u' },
  { kana: 'ぺ', romaji: 'pe', type: 'dakuten', row: 'p', column: 'e' },
  { kana: 'ぽ', romaji: 'po', type: 'dakuten', row: 'p', column: 'o' },
];

// Combination hiragana (yōon)
export const combinationHiragana: HiraganaChar[] = [
  // きゃ row
  { kana: 'きゃ', romaji: 'kya', type: 'combination', row: 'ky', column: 'a' },
  { kana: 'きゅ', romaji: 'kyu', type: 'combination', row: 'ky', column: 'u' },
  { kana: 'きょ', romaji: 'kyo', type: 'combination', row: 'ky', column: 'o' },
  
  // しゃ row
  { kana: 'しゃ', romaji: 'sha', type: 'combination', row: 'sh', column: 'a' },
  { kana: 'しゅ', romaji: 'shu', type: 'combination', row: 'sh', column: 'u' },
  { kana: 'しょ', romaji: 'sho', type: 'combination', row: 'sh', column: 'o' },
  
  // ちゃ row
  { kana: 'ちゃ', romaji: 'cha', type: 'combination', row: 'ch', column: 'a' },
  { kana: 'ちゅ', romaji: 'chu', type: 'combination', row: 'ch', column: 'u' },
  { kana: 'ちょ', romaji: 'cho', type: 'combination', row: 'ch', column: 'o' },
  
  // にゃ row
  { kana: 'にゃ', romaji: 'nya', type: 'combination', row: 'ny', column: 'a' },
  { kana: 'にゅ', romaji: 'nyu', type: 'combination', row: 'ny', column: 'u' },
  { kana: 'にょ', romaji: 'nyo', type: 'combination', row: 'ny', column: 'o' },
  
  // ひゃ row
  { kana: 'ひゃ', romaji: 'hya', type: 'combination', row: 'hy', column: 'a' },
  { kana: 'ひゅ', romaji: 'hyu', type: 'combination', row: 'hy', column: 'u' },
  { kana: 'ひょ', romaji: 'hyo', type: 'combination', row: 'hy', column: 'o' },
  
  // みゃ row
  { kana: 'みゃ', romaji: 'mya', type: 'combination', row: 'my', column: 'a' },
  { kana: 'みゅ', romaji: 'myu', type: 'combination', row: 'my', column: 'u' },
  { kana: 'みょ', romaji: 'myo', type: 'combination', row: 'my', column: 'o' },
  
  // りゃ row
  { kana: 'りゃ', romaji: 'rya', type: 'combination', row: 'ry', column: 'a' },
  { kana: 'りゅ', romaji: 'ryu', type: 'combination', row: 'ry', column: 'u' },
  { kana: 'りょ', romaji: 'ryo', type: 'combination', row: 'ry', column: 'o' },
  
  // ぎゃ row
  { kana: 'ぎゃ', romaji: 'gya', type: 'combination', row: 'gy', column: 'a' },
  { kana: 'ぎゅ', romaji: 'gyu', type: 'combination', row: 'gy', column: 'u' },
  { kana: 'ぎょ', romaji: 'gyo', type: 'combination', row: 'gy', column: 'o' },
  
  // じゃ row
  { kana: 'じゃ', romaji: 'ja', type: 'combination', row: 'j', column: 'a' },
  { kana: 'じゅ', romaji: 'ju', type: 'combination', row: 'j', column: 'u' },
  { kana: 'じょ', romaji: 'jo', type: 'combination', row: 'j', column: 'o' },
  
  // びゃ row
  { kana: 'びゃ', romaji: 'bya', type: 'combination', row: 'by', column: 'a' },
  { kana: 'びゅ', romaji: 'byu', type: 'combination', row: 'by', column: 'u' },
  { kana: 'びょ', romaji: 'byo', type: 'combination', row: 'by', column: 'o' },
  
  // ぴゃ row
  { kana: 'ぴゃ', romaji: 'pya', type: 'combination', row: 'py', column: 'a' },
  { kana: 'ぴゅ', romaji: 'pyu', type: 'combination', row: 'py', column: 'u' },
  { kana: 'ぴょ', romaji: 'pyo', type: 'combination', row: 'py', column: 'o' },
];

// Export all hiragana
export const allHiragana = [
  ...basicHiragana,
  ...dakutenHiragana,
  ...combinationHiragana,
];

// Get hiragana by type
export const getHiraganaByType = (type: 'basic' | 'dakuten' | 'combination') => {
  return allHiragana.filter(char => char.type === type);
};

// Get hiragana by row
export const getHiraganaByRow = (row: string) => {
  return allHiragana.filter(char => char.row === row);
};