package nikhil.hackru.pebbletennis;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;

import com.getpebble.android.kit.Constants;
import com.getpebble.android.kit.PebbleKit;
import com.getpebble.android.kit.util.PebbleDictionary;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


public class MainActivity extends Activity {

    // receives data
    private PebbleKit.PebbleDataReceiver mReceiver;
    // sends data
    private Handler mHandler = new Handler();


    // UUID for my custom accelerometer app
    private UUID accelUUID = UUID.fromString("3abfe0f2-8bdd-4a64-ab53-001ae2c26cf8");


    // datalog receiver for my custom datum
    PebbleKit.PebbleDataLogReceiver dataloggingReceiver;






    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }



    @Override
    protected void onResume() {
        super.onResume();

        // check if pebble is connected
        boolean isConnected = PebbleKit.isWatchConnected(this);
        Toast.makeText(this, "Pebble " + (isConnected ? "is" : "is not") + " connected!", Toast.LENGTH_SHORT).show();

        // Launch the app
        PebbleKit.startAppOnPebble(this, accelUUID);

        Toast.makeText(this, "Launching...", Toast.LENGTH_SHORT).show();

        if (dataloggingReceiver == null) {
            dataloggingReceiver = new PebbleKit.PebbleDataLogReceiver(accelUUID) {
                @Override
                public void receiveData(Context context, UUID logUuid, Long timestamp, Long tag, int data) {
                    super.receiveData(context, logUuid, timestamp, tag, data);

                    Toast.makeText(getApplicationContext(), data, Toast.LENGTH_SHORT).show();

                }
            };
        }


        // Register DataLogging Receiver
        PebbleKit.registerDataLogReceiver(this, dataloggingReceiver);
//
//        // Get information back from the watchapp
//        if(mReceiver == null) {
//            mReceiver = new PebbleKit.PebbleDataReceiver(accelUUID) {
//
//                @Override
//                public void receiveData(Context context, int id, PebbleDictionary data) {
//                    // Always ACKnowledge the last message to prevent timeouts
//                    PebbleKit.sendAckToPebble(getApplicationContext(), id);
//
//                    int mal = data.size();
//                    Log.d("Size of datum", Integer.toString(mal));
//
//                    long state = data.getInteger(1);
//                    Toast.makeText(getApplicationContext(), mal, Toast.LENGTH_SHORT).show();
//                }
//
//            };
//        }

//// Register the receiver to get data
//        PebbleKit.registerReceivedDataHandler(this, dataloggingReceiver);

    }




    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
