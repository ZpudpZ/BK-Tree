// Implementación del BK Tree
class BKTree {
    constructor() {
        this.root = null;
    }

    insert(word) {
        if (!this.root) {
            this.root = new Node(word);
        } else {
            this.root.insert(word);
        }
    }

    search(query, maxDistance) {
        if (!this.root) return [];
        return this.root.search(query, maxDistance);
    }
}

class Node {
    constructor(word) {
        this.word = word;
        this.children = {};
    }

    insert(word) {
        const distance = this.calculateDistance(word, this.word);
        if (!this.children[distance]) {
            this.children[distance] = new Node(word);
        } else {
            this.children[distance].insert(word);
        }
    }

    search(query, maxDistance) {
        let results = [];
        const distance = this.calculateDistance(query, this.word);
        if (distance <= maxDistance) {
            results.push(this.word);
        }
        for (let d = distance - maxDistance; d <= distance + maxDistance; d++) {
            if (this.children[d]) {
                results = results.concat(this.children[d].search(query, maxDistance));
            }
        }
        return results;
    }

    calculateDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        const dp = [];
        for (let i = 0; i <= m; i++) {
            dp[i] = [];
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else {
                    dp[i][j] = 0;
                }
            }
        }
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],
                        dp[i][j - 1],
                        dp[i - 1][j - 1]
                    );
                }
            }
        }
        return dp[m][n];
    }
}
