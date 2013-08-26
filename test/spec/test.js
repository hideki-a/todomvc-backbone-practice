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

    describe("Todo List Item View", function () {
        beforeEach(function () {
            this.todo = new app.Todo({ title: "test" });
            this.item = new app.TodoView({ model: this.todo });
            this.save_stub = sinon.stub(this.todo, "save");
        });

        afterEach(function () {
            this.save_stub.restore();
        });

        it("render()がviewオブジェクトを返すこと", function () {
            expect(this.item.render()).to.equal(this.item);
        });

        it("リストアイテムがレンダリングされること", function () {
            expect(this.item.render().el.nodeName).to.equal("LI");
        });

        describe("Template", function () {
            beforeEach(function () {
                this.item.render();
            });

            it("タイトルがテキスト形式で存在すること", function () {
                expect(this.item.$el.find("label").text()).to.equal('test');
            });

            it("完了のチェックボックスが含まれること", function () {
                expect(this.item.$el.find(".toggle")).to.have.length(1);
            });

            it("完了のチェックボックスがチェックされていないこと", function () {
                expect(this.item.$el.find(".toggle").is(":checked")).to.be(false);
            });

            it("todoを完了にできること", function () {
                this.todo.set("completed", true);
                this.item.render();
                expect(this.item.$el.find(".toggle").is(":checked")).to.be(true);
            });
        });
    });
});
