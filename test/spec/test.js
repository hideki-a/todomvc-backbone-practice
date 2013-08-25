"use strict";

describe("Todo", function () {
    describe("Application", function () {
        it("名前空間オブジェクトが作成されること", function () {
            expect(app).to.be.ok();
        });
    });
    
    describe("Initialization", function () {
        beforeEach(function () {
            this.todo = new app.Todo();
        });

        it("デフォルトステータスが'pending'であること", function () {
            expect(this.todo.get("completed")).to.be(false);
        });

        it("デフォルトのタイトルが空であること", function () {
            expect(this.todo.get("title")).to.be.empty();
        });
    });
});
