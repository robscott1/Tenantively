import io.xpring.xrpl.TransactionStatus;
import io.xpring.xrpl.Wallet;
import io.xpring.xrpl.WalletGenerationResult;
import io.xpring.xrpl.XpringClient;

import java.math.BigInteger;

public class WalletCreate {

    public static void main(String[] args) throws Exception{
        // Generate a random wallet.
        WalletGenerationResult generationResult = Wallet.generateRandomWallet();
        Wallet newWallet = generationResult.getWallet();

        //Wallet can be recreated with the artifacts of the initial generation.
        Wallet copyOfNewWallet = new Wallet(generationResult.getMnemonic(), generationResult.getDerivationPath());

        System.out.println(newWallet.getAddress()); // X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr
        System.out.println(newWallet.getPublicKey()); // 031D68BC1A142E6766B2BDFB006CCFE135EF2E0E2E94ABB5CF5C9AB6104776FBAE
        System.out.println(newWallet.getPrivateKey()); // 0090802A50AA84EFB6CDB225F17C27616EA94048C179142FECF03F4712A07EA7A4

        String mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
        String message = "deadbeef"; // why is this the only string that works


        Wallet wallet = new Wallet(mnemonic, null);

        String signature = wallet.sign(message);
        wallet.verify(message, signature); // true

        String grpcURL = "alpha.test.xrp.xpring.io:50051"; // TestNet URL, use alpha.xrp.xpring.io:50051 for MainNet
        XpringClient xpringClient = new XpringClient();

        String address = "X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr";
        BigInteger balance = xpringClient.getBalance(address);
        System.out.println("Balance: ");
        System.out.println(balance); // Logs a balance in drops of XRP

        String transactionHash = "9FC7D277C1C8ED9CE133CC17AEA9978E71FC644CE6F5F0C8E26F1C635D97AF4A";
        TransactionStatus transactionStatus = xpringClient.getTransactionStatus(transactionHash); // TransactionStatus.SUCCEEDED
        System.out.println(transactionStatus);

        // Amount of XRP to send.
        BigInteger amount = new BigInteger("1");

        // Wallet to send from.
        WalletGenerationResult walletGenerationResult = Wallet.generateRandomWallet();
        Wallet wallet1 = walletGenerationResult.getWallet();

        // Destination address.
        String destinationAddress = "X7u4MQVhU2YxS4P9fWzQjnNuDRUkP3GM6kiVjTjcQgUU3Jr";

        String transactionHash1 = xpringClient.send(amount, destinationAddress, wallet1);
    }
}
