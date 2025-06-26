import XCTest
import SwiftTreeSitter
import TreeSitterSimfony

final class TreeSitterSimfonyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_simfony())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Simfony grammar")
    }
}
