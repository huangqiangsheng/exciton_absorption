clc;clear;
filename = ['sample1_No.10_sweep_v_sweep_lambda_10_dB.csv'];
M = csvread(filename);
wl = M(1,2:end);
voltage = M(3:3:end,1);
power = M(4:3:end,2:end);
current = M(5:3:end,2:end);
% for iter = 1:length(voltage)
%     ind = find(power(iter,:)<-110);
%     power(iter,ind) = (power(iter,ind-1)+power(iter,ind+1))/2;
% end

normal_current = current;
fnormal_current= normal_current;
for iter = 1:length(voltage)
    fnormal_current(iter,:) = smooth(wl,normal_current(iter,:),0.1,'rloess');
end
% for iter = 1:6
%     figure(iter);
%     plot(wl,fnormal_power((iter-1)*7+1:iter*7,:)); 
%     xlabel('\lambda (nm)');
%     ylabel('Transmission variation(dB)')
%     legend(num2str(voltage((iter-1)*7+1:iter*7,:)),'Location','SouthEastOutside');
%     axis([1540,1570,-25,0])
% end
figure(7);
pcolor(voltage,wl,10*log10(abs(fnormal_current))'); shading interp
ylabel('\lambda (nm)');
xlabel('Bias (V)')
title('normalized current with filter')