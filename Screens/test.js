`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 29/07/2021 14:32:21 PM
// Design Name: 
// Module Name: testbench
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created

//////////////////////////////////////////////////////////////////////////////////



`define FIFO_WIDTH 3

//module start

module testbench();
reg clck, reset, write_en, read_en ;
reg[15:0] data_input;
reg[15:0] tempdata;
wire [15:0] data_output;
wire [`FIFO_WIDTH :0] fifo_ct;
wire ct_empty,ct_full;
     
         
fifo_project ff( .clck(clck), .reset(reset), .data_input(data_input), .data_output(data_output),.write_en(write_en), .read_en(read_en), .ct_empty(ct_empty),.ct_full(ct_full), .fifo_ct(fifo_ct) );

initial begin

   clck = 1'b0;

   reset = 1'b1;
   read_en = 1'b0;
   write_en = 1'b0;

   tempdata = 16'h0;

   data_input = 16'h0;


  #100;
  
  write_en = 1'b1;
  reset=1'b1;
  
  #20
  reset=1'b0;

  write_en = 1'b1;


  data_input = 16'h0;
  #20;

  data_input  = 16'h1;

  #20;

  data_input  = 16'h2;

  #20;

  data_input  = 16'h3;

  #20;

  data_input  = 16'h4;

  #20;

  write_en = 1'b0;


  read_en = 1'b1;  

 end 
 
 always #10 clck = ~clck;    

endmodule

//end module
