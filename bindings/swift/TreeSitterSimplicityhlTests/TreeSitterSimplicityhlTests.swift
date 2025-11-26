import XCTest
import SwiftTreeSitter
import TreeSitterSimplicityhl

final class TreeSitterSimplicityhlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_simplicityhl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading SimplicityHL grammar")
    }
}
