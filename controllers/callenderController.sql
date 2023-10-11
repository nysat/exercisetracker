namespace App\HTTP\Controllers;

use App\Models\Booking;
use Illuminate\HTTP\request;


class CalenderController extends Controllers
{
    public function index()
    {

        $booking = Booking::all();
        $events = array()
    }
}