interface String {
    endsWith(value: any, index: any): boolean;
    trimEnd(value: string): string;
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}


/**
 * Removes the provided value from this string if it exists.
 * @returns A trimmed string.
 */
String.prototype.trimEnd = function (value: string): string {
    if (!this.endsWith(value)) {
        return this;
    }
    var length = value.length;
    return this.slice(0, length * -1);
};