var expect = require('expect');
var sinon = require('sinon');

var Meme = require('./Meme');
 
describe('meme', function() {
    it('name 不能为空', function(done) {
        var m = new Meme();
 
        m.validate(function(err) {
            expect(err.errors.name).toNotBe(null);
            done();
        });
    });
    it('数据长度测试3',function (done) {  

        expect('sss'.length).toBe(3);
        done();
    })
});

it('【抛出异常】当dank为false', function(done) {
    //1. set up the model in a way the validation should fail
    var m = new Meme({ repost: true });
 
    //2. run validate
    m.validate(function(err) {
        //3. check for the error property we need
        expect(err.errors.repost).toExist();
        done();
    });
});
 
it('【正常显示】当dank为True', function(done) {
    //1. set up the model in a way the validation should succeed
    var m = new Meme({ repost: true, dank: true });
 
    //2. run validate 
    m.validate(function(err) {
        //3. check for the error property that shouldn't exist now
       // expect(err.errors.repost).to.not.exist;
        expect(err.errors.repost).toNotExist();
        done();
    });
});

it('should check for reposts with same name', sinon.test(function() {
    this.stub(Meme, 'findOne');
    var expectedName = 'This name should be used in the check';
    var m = new Meme({ name: expectedName });
 
    m.checkForReposts(function() { });
 
    sinon.assert.calledWith(Meme.findOne, {
        name: expectedName,
        repost: true
    });
}));
it('should call back with true when repost exists', sinon.test(function(done) {
    var repostObject = { name: 'foo' };
    this.stub(Meme, 'findOne').yields(null, repostObject);
    var m = new Meme({ name: 'some name' });
 
    m.checkForReposts(function(hasReposts) {
        expect(hasReposts).toBeTruthy();
        done();
    });
}));
 
