const tagMap: Record<string, string> = {
	groom: '新郎',
	bride: '新婦',
};

export function convertTagName(tagStr: string) {
	return tagMap[tagStr] || tagStr;
}
