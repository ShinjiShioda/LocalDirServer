# LocalDirServer
URLからローカルディレクトリをエクスプローラーで開くためのnode.jsで書かれたHTTPサーバー  
## 起動
LocalDirServer.batを使って起動します。  
node.exeを使って直接起動することもできます。  
起動オプションとして、待ち受けポート番号を指定できます。  
指定しない、あるいは間違った指定（たとえば1024未満のWell-Knownポートを指定した場合）や正しい10進数のポート番号として認識できない場合には、デフォルトのポート番号3000を使います。  

    LocalDirServer.bat [ポート番号]

直接起動する場合

    node.exe     LocalDirServer.js [ポート番号]

Windowsのスタートメニューなどに登録する場合には、batファイルへのリンクを作ったほうがいいでしょう。  
## 利用方法
ホスト名としてLocalhostを使って、ローカルパスを'/'区切りで指定したURLを開きます。  
例　C:\temp\000-Testを開く  
    http://localhost:3000/c:/temp/000-Test
