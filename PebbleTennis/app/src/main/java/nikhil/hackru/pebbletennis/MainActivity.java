package nikhil.hackru.pebbletennis;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
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


public class MainActivity extends Activity {

    private PebbleKit.PebbleDataReceiver mReceiver;


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


        // send some bootycalls
        // Push a notification
        final Intent i = new Intent("com.getpebble.action.SEND_NOTIFICATION");

        final Map data = new HashMap();
        data.put("title", "Test Message");
        data.put("body", "Whoever said nothing was impossible never tried to slam a revolving door.");
        final JSONObject jsonData = new JSONObject(data);
        final String notificationData = new JSONArray().put(jsonData).toString();

        i.putExtra("messageType", "PEBBLE_ALERT");
        i.putExtra("sender", "PebbleKit Android");
        i.putExtra("notificationData", notificationData);
        sendBroadcast(i);


//
//        // Get information back from the watchapp
//        if(mReceiver == null) {
//            mReceiver = new PebbleKit.PebbleDataReceiver(Constants.SPORTS_UUID) {
//
//                @Override
//                public void receiveData(Context context, int id, PebbleDictionary data) {
//                    // Always ACKnowledge the last message to prevent timeouts
//                    PebbleKit.sendAckToPebble(getApplicationContext(), id);
//
//                    // Get action and display
//                    int state = data.getUnsignedIntegerAsLong(Constants.SPORTS_STATE_KEY).intValue();
//                    Toast.makeText(getApplicationContext(),
//                            (state == Constants.SPORTS_STATE_PAUSED ? "Resumed!" : "Paused!"), Toast.LENGTH_SHORT).show();
//                }
//
//            };
//        }
//
//// Register the receiver to get data
        PebbleKit.registerReceivedDataHandler(this, mReceiver);

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
