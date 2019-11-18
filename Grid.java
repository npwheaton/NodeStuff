import java.util.Scanner;
import java.util.Arrays;

public class Grid
{
	
	static class gridSpace
	{
		int walker1;
		int walker2;
		int walker3;
		int walker4;
		void init()
		{
			walker1 = 0;
			walker2 = 0;
			walker3 = 0;
			walker4 = 0;
		}
	}
	
	static void arrayGrid(int r, int c)
	{
		gridSpace[][] arr;
		int entryStart = 0;
		arr = new gridSpace[r][c];
		 for(int b = 0; b < r; b++)
		    for(int a = 0; a < c; a++)
			{
		      arr[b][a] = new gridSpace();
			  arr[b][a].init();
			}
		System.out.println(arr[0][0].walker1);
	}
	
	public static void main(String[] args)
	{
		int row = 0;
		int column = 0;
		Scanner inp = new Scanner(System.in);
		System.out.println("please enter two integers");
		row = inp.nextInt();
		column = inp.nextInt();
		arrayGrid(row, column);
	}
}
